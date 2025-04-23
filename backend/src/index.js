import express from "express";
import cors from "cors";
import supabase from "./services/supabase.js";

const app = express();

// ดึงพอร์ตจาก process.env (กำหนดใน docker-compose.yml)
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route ทดสอบการเชื่อมต่อ Supabase
app.get("/", (req, res) => {
  if (supabase) {
    return res.send("✅ Supabase is connected");
  }
  res.status(500).send("❌ Supabase not initialized");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
