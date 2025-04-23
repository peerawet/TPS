import { Router } from "express";
import supabase from "../services/supabase.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: req.body.email,
        password: req.body.password,
      }
    );

    if (signUpError) {
      console.error("Sign-up error:", signUpError.message);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const userId = signUpData.user.id;

    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          email: req.body.email,
          name: req.body.name,
        },
      ]);

    if (insertError) {
      console.error(`Error inserting data`, insertError.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Unhandled error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: req.body.email,
      password: req.body.password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return res.status(400).json({
        message: error.message,
      });
    }

    // ใช้ token จาก Supabase
    const token = data.session.access_token;

    // ดึงข้อมูลเพิ่มเติมจากตาราง users ถ้าต้องการ
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      console.error("User fetch error:", userError.message);
      return res.status(500).json({ message: "Cannot fetch user data" });
    }

    return res.status(200).json({
      token,
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Unhandled error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Unexpected error during login",
    });
  }
});
