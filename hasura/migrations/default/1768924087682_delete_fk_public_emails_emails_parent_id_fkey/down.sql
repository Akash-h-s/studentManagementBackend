alter table "public"."emails"
  add constraint "emails_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."parents"
  ("id") on update no action on delete cascade;
