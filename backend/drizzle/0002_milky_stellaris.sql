ALTER TABLE "distributors" ADD COLUMN "xp_balance" integer DEFAULT 10000;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_from_user_id_distributors_id_fk" FOREIGN KEY ("from_user_id") REFERENCES "public"."distributors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "xp_transactions" ADD CONSTRAINT "xp_transactions_to_user_id_users_id_fk" FOREIGN KEY ("to_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
