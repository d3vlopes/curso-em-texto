CREATE TABLE "example_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"email" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "example_users_email_unique" UNIQUE("email"),
	CONSTRAINT "example_users_username_unique" UNIQUE("username")
);
