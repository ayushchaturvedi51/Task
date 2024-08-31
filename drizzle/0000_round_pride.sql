CREATE TABLE IF NOT EXISTS "users" (
	"id" serial NOT NULL,
	"user_id" varchar DEFAULT null,
	"name" varchar,
	"email" varchar,
	"age" integer,
	"gender" varchar,
	"country_code" varchar,
	"phone_number" varchar(10),
	"password" varchar,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_id_pk" PRIMARY KEY("id"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_number_unique" UNIQUE("phone_number")
);
