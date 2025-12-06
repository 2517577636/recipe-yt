import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favoriteTable } from "./db/schema.js";

const server = express();
const PORT = ENV.PORT || 8001;

server.use(express.json());

server.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

server.post("/api/favorite", async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavorite = await db
      .insert(favoriteTable)
      .values({
        userID: userId,
        recipeID: parseInt(recipeId),
        title,
        image,
        cookTime,
        servings,
      })
      .returning();

    res.status(201).json(newFavorite[0]);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.delete("/api/favorite/:userId/:reciped", async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    const deleteFavorite = await db
      .delete(favoriteTable)
      .where(
        and(
          eq(favoriteTable.userID, userId),
          eq(favoriteTable.recipeID, recipeId)
        )
      )
      .returning();

    res.status(200).json(deleteFavorite);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.get("/api/favorite/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await db
      .select()
      .from(favoriteTable)
      .where(eq(favoriteTable.userID, userId));

    res.status(200).json(favorites);
  } catch (error) {
    console.log("Error adding favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
