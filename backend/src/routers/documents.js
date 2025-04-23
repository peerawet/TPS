import { Router } from "express";
import supabase from "../services/supabase.js";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
export const documentsRouter = Router();

documentsRouter.get("/", protect, async (req, res) => {
  console.log(req.body);
  if (req.userId) {
    return res.send("✅ Middleware working, user authenticated");
  } else {
    return res.status(401).send("❌ Not authenticated");
  }
});

documentsRouter.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.userId;
    const filePath = `${userId}/${Date.now()}_${file.originalname}`;

    // อัปโหลดไฟล์ไปยัง Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("documents")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return res.status(500).json({ message: "File upload failed" });
    }

    // ตรวจสอบว่า uploadData มี path ที่ถูกต้อง
    if (!uploadData || !uploadData.path) {
      return res.status(500).json({ message: "Invalid upload response" });
    }

    // สร้าง Signed URL (ใช้ได้ 1 ชั่วโมง)
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("documents")
        .createSignedUrl(uploadData.path, 60 * 60); // 1 ชั่วโมง

    if (signedUrlError) {
      console.error("Signed URL error:", signedUrlError.message);
      return res.status(500).json({ message: "Failed to create signed URL" });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      path: filePath,
      url: signedUrlData.signedUrl,
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
