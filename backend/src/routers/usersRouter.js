import { Router } from "express";
import supabase from "../services/supabase.js";

export const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Sitter not found" });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
