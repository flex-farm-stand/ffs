-- dump-products.sql
--
-- Restore data from products table. Currently includes three products owned by
-- the `Abby` user.
--
-- PostgreSQL database dump
--
COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user) FROM stdin;
00000000-0000-0000-0000-000000000000	ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a	authenticated	authenticated	abby@maildrop.cc	$2a$10$f1E6l5LjEQMzOj/HY.9XMuSMhyjISeR8ZQ5zhjEF2VkDVTDCxceBC	2023-02-23 17:41:19.463745+00	\N		2023-02-23 17:40:53.981143+00		\N			\N	2023-02-23 17:41:19.467871+00	{"provider": "email", "providers": ["email"]}	{}	\N	2023-02-23 17:40:53.977843+00	2023-02-23 17:41:19.471969+00	\N	\N			\N		0	\N		\N	f
00000000-0000-0000-0000-000000000000	99bb0f2f-d996-420d-bbf5-31a934337876	authenticated	authenticated	barbara@maildrop.cc	$2a$10$4hXuHp5YBJxmm/geBEZQQOy3/bZOlFeWCu.IOBCHnsRB7b3sgUsm.	2023-02-23 17:41:47.748152+00	\N		2023-02-23 17:41:01.176728+00		\N			\N	2023-02-23 17:41:47.749777+00	{"provider": "email", "providers": ["email"]}	{}	\N	2023-02-23 17:41:01.17441+00	2023-02-23 17:41:47.754278+00	\N	\N			\N		0	\N		\N	f
00000000-0000-0000-0000-000000000000	d15d7d4a-9608-4efd-8fb7-737c1cb9432c	authenticated	authenticated	carol@maildrop.cc	$2a$10$L5xw5M9.ZXnzPMVtzLGIJ.3wDpvX4l/tjo92idTGyKgPDvwNa7hs.	2023-02-23 17:42:14.299715+00	\N		2023-02-23 17:41:08.057226+00		\N			\N	2023-02-23 17:42:14.300139+00	{"provider": "email", "providers": ["email"]}	{}	\N	2023-02-23 17:41:08.05474+00	2023-02-23 17:42:14.301239+00	\N	\N			\N		0	\N		\N	f
\.

update public.profiles set display_name = 'Abby''s farm'
  where id = 'ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a';

insert into public.products
  (seller_id, name, price, available, date_added)
values
  ('ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a', 'green grapes', 1.99, true, now()),
  ('ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a', 'red grapes', 1.49, true, now()),
  ('ed5fc1e5-3be9-4cbc-bcfe-9ac2b746d32a', 'black grapes', 3.99, true, now());
