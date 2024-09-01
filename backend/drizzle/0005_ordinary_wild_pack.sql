ALTER TABLE "xp_transactions" DROP CONSTRAINT "xp_transactions_from_user_id_distributors_id_fk";
--> statement-breakpoint
ALTER TABLE "achievements" ADD COLUMN "distributor_id" integer;--> statement-breakpoint
ALTER TABLE "xp_transactions" ADD COLUMN "from_user_role" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievements" ADD CONSTRAINT "achievements_distributor_id_distributors_id_fk" FOREIGN KEY ("distributor_id") REFERENCES "public"."distributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "achievements" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "achievements" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "distributors" ADD CONSTRAINT "distributors_phone_number_unique" UNIQUE("phone_number");