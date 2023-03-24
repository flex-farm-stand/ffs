-- wipe_db.sql
--
-- Performs the "cleanup" portion of the create_db script.
--
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user;
delete from storage.objects where bucket_id = 'product_images';
delete from storage.buckets;
delete from auth.users;
drop table if exists orders;
drop table if exists products;
drop table if exists profiles;
drop policy if exists "Everyone can view jpg/png images in folder"
on storage.objects;
drop policy if exists "Users can insert jpg/png images into folder"
on storage.objects;
