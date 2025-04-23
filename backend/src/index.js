import express from "express";
import cors from "cors";
import supabase from "./services/supabase.js";
import { authRouter } from "./routers/authRouter.js";
import { documentsRouter } from "./routers/documents.js";

const app = express();

// ดึงพอร์ตจาก process.env (กำหนดใน docker-compose.yml)
const PORT = process.env.BACKEND_PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/documents", documentsRouter);

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
