alter table "public"."students" alter column "parent_id" drop not null;
alter table "public"."students" add column "parent_id" int4;
