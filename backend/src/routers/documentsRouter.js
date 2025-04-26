import { Router } from "express";
import supabase from "../services/supabase.js";
import { protect } from "../middlewares/protect.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });
export const documentsRouter = Router();

documentsRouter.post("/", protect, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const tags = req.body.tags || []; // รับ tags มาเป็น array

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ตรวจสอบขนาดไฟล์ ไม่เกิน 10MB
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return res.status(400).json({ message: "File size exceeds 10MB limit" });
    }

    // ตรวจสอบชนิดไฟล์
    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return res.status(400).json({ message: "Unsupported file type" });
    }

    const userId = req.userId;
    const filename = `${Date.now()}_${file.originalname}`;
    const filePath = `${userId}/${filename}`;

    // อัปโหลดไฟล์ขึ้น Supabase Storage
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

    // สร้าง signed URL สำหรับดาวน์โหลด
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("documents")
        .createSignedUrl(uploadData.path, 60 * 60);
    if (signedUrlError) {
      console.error("Signed URL error:", signedUrlError.message);
      return res.status(500).json({ message: "Failed to create signed URL" });
    }

    // บันทึก metadata ลงในตาราง documents
    const { data: dbData, error: dbError } = await supabase
      .from("documents")
      .insert([
        {
          user_id: userId,
          file_name: filename,
          file_path: filePath,
          tags: tags,
          created_at: new Date(),
        },
      ])
      .select("id, file_name, file_path, tags")
      .single();

    if (dbError) {
      console.error("DB insert error:", dbError.message);
      return res
        .status(500)
        .json({ message: "Failed to save document metadata" });
    }

    return res.status(200).json({
      message: "File uploaded successfully",
      document: dbData,
      url: signedUrlData.signedUrl,
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

documentsRouter.get("/", protect, async (req, res) => {
  try {
    const userId = req.userId;

    // 1. ดึง metadata ของเอกสารทั้งหมดจากตาราง documents
    const { data: docs, error: dbError } = await supabase
      .from("documents")
      .select("id, file_name, file_path, tags, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (dbError) {
      console.error("DB select error:", dbError.message);
      return res.status(500).json({ message: "Failed to retrieve documents" });
    }

    // 2. สร้าง signed URL สำหรับแต่ละไฟล์
    const files = await Promise.all(
      docs.map(async (doc) => {
        const { data: signedUrlData, error: signedUrlError } =
          await supabase.storage
            .from("documents")
            .createSignedUrl(doc.file_path, 60 * 60); // 1 ชั่วโมง

        return {
          id: doc.id,
          file_name: doc.file_name,
          tags: doc.tags,
          created_at: doc.created_at,
          url: signedUrlError ? null : signedUrlData.signedUrl,
        };
      })
    );

    return res.status(200).json({ files });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

documentsRouter.delete("/delete/:id", protect, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // 1. ดึง record จาก DB เพื่อให้ได้ file_path และตรวจสอบสิทธิ์
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError || !doc) {
      console.error("Fetch document error:", fetchError?.message);
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = doc.file_path;

    // 2. ลบไฟล์จาก Supabase Storage
    const { error: storageError } = await supabase.storage
      .from("documents")
      .remove([filePath]);

    if (storageError) {
      console.error("Storage delete error:", storageError.message);
      return res
        .status(500)
        .json({ message: "Failed to delete file from storage" });
    }

    // 3. ลบ metadata ในตาราง documents
    const { error: dbError } = await supabase
      .from("documents")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (dbError) {
      console.error("DB delete error:", dbError.message);
      return res
        .status(500)
        .json({ message: "Failed to delete document record" });
    }

    return res.status(200).json({
      message: "File and metadata deleted successfully",
      id,
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

documentsRouter.get("/download/:id", protect, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    // 1. ดึง record จาก DB เพื่อให้ได้ file_path และตรวจสอบสิทธิ์
    const { data: doc, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError || !doc) {
      console.error("Fetch document error:", fetchError?.message);
      return res.status(404).json({ message: "Document not found" });
    }

    const filePath = doc.file_path;

    // 2. สร้าง signed URL สำหรับดาวน์โหลด
    const { data: signedUrlData, error: signedUrlError } =
      await supabase.storage
        .from("documents")
        .createSignedUrl(filePath, 60 * 60); // หมดอายุใน 1 ชั่วโมง

    if (signedUrlError || !signedUrlData) {
      console.error("Signed URL error:", signedUrlError?.message);
      return res
        .status(500)
        .json({ message: "Failed to generate download URL" });
    }

    // 3. คืนลิงก์ดาวน์โหลด
    return res.status(200).json({
      message: "Download link generated",
      url: signedUrlData.signedUrl,
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

documentsRouter.put("/:id", protect, async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const { tags, file_name } = req.body;

    // ตรวจสอบ input เบื้องต้น
    if (!Array.isArray(tags) && typeof file_name !== "string") {
      return res.status(400).json({ message: "Nothing to update" });
    }
    if (tags && !Array.isArray(tags)) {
      return res.status(400).json({ message: "`tags` must be an array" });
    }

    // 1. เช็คว่า document นี้เป็นของ user จริง
    const { data: existing, error: fetchError } = await supabase
      .from("documents")
      .select("file_path")
      .eq("id", id)
      .eq("user_id", userId)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ message: "Document not found" });
    }

    // เตรียม object สำหรับ update
    const updates = {};
    if (tags) updates.tags = tags;
    if (file_name) updates.file_name = file_name;

    // 2. อัปเดต metadata ในฐานข้อมูล
    const { data: updatedDoc, error: updateError } = await supabase
      .from("documents")
      .update(updates)
      .eq("id", id)
      .eq("user_id", userId)
      .select("id, file_name, tags, created_at")
      .single();

    if (updateError) {
      console.error("DB update error:", updateError.message);
      return res.status(500).json({ message: "Failed to update document" });
    }

    return res.status(200).json({
      message: "Document updated successfully",
      document: updatedDoc,
    });
  } catch (err) {
    console.error("Unhandled error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
