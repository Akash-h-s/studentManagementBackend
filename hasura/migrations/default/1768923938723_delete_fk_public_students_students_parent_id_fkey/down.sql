alter table "public"."students"
  add constraint "students_parent_id_fkey"
  foreign key ("parent_id")
  references "public"."parents"
  ("id") on update no action on delete set null;
