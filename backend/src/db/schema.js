import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
// import { sql } from "drizzle-orm";

export const favoriteTable = pgTable("favorite", {
  id: serial("id").primaryKey(),
  userID: text("userID").notNull(),
  recipeID: integer("recipedID").notNull(),
  title: text("title").notNull(),
  image: text("image"),
  cookTime: text("cook_time"),
  servings: text("servings"),
  createAtTime: timestamp("create_at_time").defaultNow(),
});
