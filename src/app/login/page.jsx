"use client";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ResetPassword from "@/components/ResetPassword";
import EmailCode from "@/components/EmailCode";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";
export default function LoginPage() {
  const [mode, setMode] = useState("emailCode");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const wixClient = useWixClient();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      switch (mode) {
        case "login":
          // let response = await wixClient.auth.register({
          //   email,
          //   password,
          // });
          console.log(email);
          console.log("========================");
          console.log(password);
          break;
        case "register":
          console.log(username);
          console.log("========================");
          console.log(email);
          console.log("========================");
          console.log(password);
          break;
        case "resetPassword":
          console.log(username);
          console.log("========================");
          console.log(email);
          console.log("========================");
          console.log(password);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Some Thing Went Wrong..! ");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="">
      {mode == "login" && (
        <Login
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          setMode={setMode}
        />
      )}
      {mode == "register" && (
        <Register
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          setMode={setMode}
        />
      )}
      {mode == "resetPassword" && (
        <ResetPassword
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          setMode={setMode}
        />
      )}
      {mode == "emailCode" && (
        <EmailCode
          setEmailCode={setEmailCode}
          handleSubmit={handleSubmit}
          setMode={setMode}
        />
      )}
      {error && <div className="text-red-600">{error}</div>}
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
}
