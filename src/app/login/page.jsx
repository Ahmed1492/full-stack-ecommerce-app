"use client";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ResetPassword from "@/components/ResetPassword";
import { useState } from "react";
export default function LoginPage() {
  const [mode, setMode] = useState("resetPassword");
  return (
    <div>
      {mode == "login" && <Login />}
      {mode == "register" && <Register />}
      {mode == "ResetPassword" && <ResetPassword />}
    </div>
  );
}
