"use client";
import Login from "@/components/Login";
import Register from "@/components/Register";
import ResetPassword from "@/components/ResetPassword";
import EmailCode from "@/components/EmailCode";
import { useWixClient } from "@/hooks/useWixClient";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const wixClient = useWixClient();
  const pathName = usePathname();
  const router = useRouter();
  const isLoggedIn = wixClient.auth.loggedIn();
  // console.log("isLoggedIn ", isLoggedIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      let response;
      switch (mode) {
        case "login":
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case "register":
          response = await wixClient?.auth?.register({
            email,
            password,
            profile: {
              nickname: username,
            },
          });
          break;
        case "resetPassword":
          response = await wixClient.auth.sendPasswordResetEmail({
            email,
            // pathName,
          });
          break;
        case "emailCode":
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;

        default:
          break;
      }
      console.log("MyResponse : ", response);

      switch (response?.loginState) {
        case LoginState?.SUCCESS:
          setMessage("Successfull ! You Will Be Redirected");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken
          );

          // inside the wixClient instance (in memory).
          wixClient.auth.setTokens(tokens);
          // Store Token in Cookies
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          router.push("/");
          console.log("tokens ", tokens);

          break;

        default:
          break;
      }
    } catch (error) {
      console.log("Some Thing Went Wrong..! ");
      console.log(error);
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
      {error && (
        <div className="m-auto text-center mt-6 font-bold text-red-600">
          {error}
        </div>
      )}
      {message && (
        <div className="m-auto text-center mt-6 font-bold text-green-600">
          {message}
        </div>
      )}
    </div>
  );
}
