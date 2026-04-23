"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  { emoji: "👗", label: "New Arrivals" },
  { emoji: "👟", label: "Top Footwear" },
  { emoji: "👜", label: "Accessories" },
  { emoji: "🔥", label: "Hot Deals" },
];

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // login | register | resetPassword | emailCode
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const wixClient = useWixClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      let response;
      if (mode === "login") {
        response = await wixClient.auth.login({ email, password });
      } else if (mode === "register") {
        response = await wixClient.auth.register({ email, password, profile: { nickname: username } });
      } else if (mode === "resetPassword") {
        response = await wixClient.auth.sendPasswordResetEmail({ email });
      } else if (mode === "emailCode") {
        response = await wixClient.auth.processVerification({ verificationCode: emailCode });
      }

      if (response?.loginState === LoginState.SUCCESS) {
        setMessage("Success! Redirecting...");
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(response.data.sessionToken);
        wixClient.auth.setTokens(tokens);
        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), { expires: 2 });
        router.push("/");
      } else if (response?.loginState === LoginState.FAILURE) {
        const code = response.errorCode;
        if (code === "invalidEmail" || code === "invalidPassword") setError("Invalid email or password.");
        else if (code === "emailAlreadyExists") setError("Email already registered. Please log in.");
        else if (code === "resetPassword") setMessage("Check your email to reset your password.");
        else setError("Something went wrong. Please try again.");
      } else if (mode === "resetPassword") {
        setMessage("Reset link sent! Check your inbox.");
      }
    } catch (err) {
      if (err?.details?.applicationError?.code === "MEMBER_ALREADY_EXISTS" || err?.status === 409) {
        setError("Email already registered. Please log in.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const titles = {
    login: { heading: "Welcome back", sub: "Sign in to your account to continue" },
    register: { heading: "Create account", sub: "Join thousands of happy shoppers" },
    resetPassword: { heading: "Forgot password?", sub: "Enter your email and we'll send a reset link" },
    emailCode: { heading: "Check your email", sub: "Enter the verification code we sent you" },
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT — decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#D02E64] to-[#7c1d3f] flex-col justify-between p-12 relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/5 rounded-full" />
        <div className="absolute top-20 -left-10 w-40 h-40 bg-white/5 rounded-full" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 z-10">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Image src="/logo.png" alt="" width={18} height={18} />
          </div>
          <span className="text-white text-xl font-bold">Ecommerce</span>
        </Link>

        {/* Center content */}
        <div className="z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Shop the latest<br />trends today
          </h2>
          <p className="text-pink-200 text-sm leading-relaxed mb-8 max-w-xs">
            Thousands of products, exclusive deals, and fast delivery — all in one place.
          </p>
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {SLIDES.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 bg-white/15 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                {s.emoji} {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <p className="text-pink-300 text-xs z-10">© 2025 Ecommerce. All rights reserved.</p>
      </div>

      {/* RIGHT — form panel */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 bg-gray-50">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
          <Image src="/logo.png" alt="" width={20} height={20} />
          <span className="text-lg font-bold text-gray-900">Ecommerce</span>
        </Link>

        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">{titles[mode].heading}</h1>
            <p className="text-gray-500 text-sm mt-2">{titles[mode].sub}</p>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Username — register only */}
              {mode === "register" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="johndoe"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              )}

              {/* Email */}
              {mode !== "emailCode" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
              )}

              {/* Password */}
              {(mode === "login" || mode === "register") && (
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    {mode === "login" && (
                      <button type="button" onClick={() => setMode("resetPassword")}
                        className="text-xs text-[#D02E64] hover:underline">
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-2 focus:ring-pink-100 transition pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
              )}

              {/* Email code */}
              {mode === "emailCode" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700">Verification Code</label>
                  <input
                    type="text"
                    placeholder="Enter code from email"
                    onChange={(e) => setEmailCode(e.target.value)}
                    required
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#D02E64] focus:ring-2 focus:ring-pink-100 transition tracking-widest text-center text-lg"
                  />
                </div>
              )}

              {/* Error / Success */}
              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-xl">
                  <span>⚠️</span> {error}
                </div>
              )}
              {message && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-sm px-4 py-3 rounded-xl">
                  <span>✅</span> {message}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm text-white transition flex items-center justify-center gap-2 ${
                  isLoading ? "bg-pink-300 cursor-not-allowed" : "bg-[#D02E64] hover:bg-[#b02555] active:scale-[0.99]"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Please wait...
                  </>
                ) : (
                  { login: "Sign In", register: "Create Account", resetPassword: "Send Reset Link", emailCode: "Verify" }[mode]
                )}
              </button>
            </form>
          </div>

          {/* Mode switcher */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "login" && (
              <>Don't have an account?{" "}
                <button onClick={() => { setMode("register"); setError(""); setMessage(""); }}
                  className="text-[#D02E64] font-semibold hover:underline">Sign up</button>
              </>
            )}
            {mode === "register" && (
              <>Already have an account?{" "}
                <button onClick={() => { setMode("login"); setError(""); setMessage(""); }}
                  className="text-[#D02E64] font-semibold hover:underline">Sign in</button>
              </>
            )}
            {(mode === "resetPassword" || mode === "emailCode") && (
              <button onClick={() => { setMode("login"); setError(""); setMessage(""); }}
                className="text-[#D02E64] font-semibold hover:underline">← Back to Sign In</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
