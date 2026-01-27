alter table "public"."teachers" alter column "password_hash" drop not null;
alter table "public"."teachers" add column "password_hash" text;
