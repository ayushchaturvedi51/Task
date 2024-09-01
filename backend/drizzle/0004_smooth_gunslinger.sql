ALTER TABLE "marketplace_items" DROP CONSTRAINT "marketplace_items_distributor_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "marketplace_items" ADD CONSTRAINT "marketplace_items_distributor_id_distributors_id_fk" FOREIGN KEY ("distributor_id") REFERENCES "public"."distributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
