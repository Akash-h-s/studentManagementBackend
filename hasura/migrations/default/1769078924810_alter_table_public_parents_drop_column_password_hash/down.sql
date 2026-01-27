alter table "public"."parents" alter column "password_hash" drop not null;
alter table "public"."parents" add column "password_hash" text;
