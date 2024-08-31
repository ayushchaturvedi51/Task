ALTER TABLE "xp_transactions" DROP CONSTRAINT "xp_transactions_from_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "xp_transactions" DROP CONSTRAINT "xp_transactions_to_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "distributor_login_id" varchar;--> statement-breakpoint
ALTER TABLE "admins" ADD COLUMN "distributor_login_password" varchar;--> statement-breakpoint
ALTER TABLE "distributors" ADD COLUMN "phone_number" integer;--> statement-breakpoint
ALTER TABLE "distributors" ADD COLUMN "role" varchar DEFAULT 'distributor';--> statement-breakpoint
ALTER TABLE "marketplace_items" ADD COLUMN "is_redeemed" boolean DEFAULT false;