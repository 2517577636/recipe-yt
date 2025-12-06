CREATE TABLE "favorite" (
	"id" serial PRIMARY KEY NOT NULL,
	"userID" text NOT NULL,
	"recipedID" integer NOT NULL,
	"title" text NOT NULL,
	"image" text,
	"cook_time" text,
	"servings" text,
	"create_at_time" timestamp DEFAULT now()
);
