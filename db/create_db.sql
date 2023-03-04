--
-- create_db.sql
--
-- This is meant to be run either
--    - in the Supabase SQL Editor tool
--    - via the psql command line tool (see the file: commands.sh)
--
-- CLEAN UP
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
delete from storage.objects where bucket_id = 'product_images';
delete from auth.users;
drop table if exists orders;
drop table if exists products;
drop table if exists profiles;
drop policy if exists "Everyone can view jpg/png images in folder"
on storage.objects;
drop policy if exists "Users can insert jpg/png images into folder"
on storage.objects;

-- === TABLES ===
-- *** Storage buckets ***
insert into storage.buckets
  (id, name)
values
  ('product_images', 'product_images')
on conflict do nothing;

-- *** Profiles ***
create table profiles (
 id uuid not null references auth.users on delete cascade,
 display_name varchar(32),

 primary key (id)
);
alter table public.profiles enable row level security;
-- *** Products ***
create table products (
id bigint generated always as identity,
seller_id uuid not null references profiles (id) on delete cascade,
name varchar(32),
price decimal,
available bool,
image_filename varchar(32),
date_added timestamptz default now(),

primary key (id)
);
alter table products enable row level security;
-- *** Orders ***
create table orders (
id bigint generated always as identity,
product_id bigint not null references products (id) on delete restrict,
buyer_id uuid not null references profiles (id) on delete restrict,
seller_id uuid not null references profiles (id) on delete restrict,

primary key (id)
);
alter table public.orders enable row level security;

-- === POLICIES ===
-- *** Storage buckets ***
create policy "Everyone can view jpg/png images in folder"
on storage.objects for select
to public using (
  bucket_id = 'product_images' and
  lower((storage.foldername(name))[1]) = 'public' and
  storage."extension"(name) in ('jpg', 'jpeg', 'png') );
create policy "Users can insert jpg/png images into folder"
on storage.objects for insert
to authenticated with check (
  bucket_id = 'product_images' and
  lower((storage.foldername(name))[1]) = 'public' and
  storage."extension"(name) in ('jpg', 'jpeg', 'png') );
-- *** Profiles ***
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );
create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );
create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );
-- *** Products ***
create policy "Products are viewable by everyone."
  on products for select
  using ( true );
create policy "Users can insert their own products."
  on products for insert
  with check ( auth.uid() = seller_id );
create policy "Users can update their own products."
  on products for update
  using ( auth.uid() = seller_id );
-- *** Orders ***
create policy "Orders are viewable by buyers and sellers."
  on orders for select
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );
create policy "Buyers can insert their own orders."
  on orders for insert
  with check ( auth.uid() = buyer_id );
create policy "Buyers and sellers can update their own products."
  on orders for update
  using ( auth.uid() = buyer_id or auth.uid() = seller_id );

-- === FUNCTIONS ===
-- *** handle_new_user ***
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- === TRIGGERS ===
-- *** on_auth_user_created ***
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
