"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ProfileUpdateForm({ user }) {
  const [form, setForm] = useState({
    username: user?.profile?.nickname || "",
    firstname: user?.contact?.firstName || "",
    surname: user?.contact?.lastName || "",
    phone: user?.contact?.phones?.[0] || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  if (!user?.contactId) {
    return <p className="text-gray-500">Not logged in.</p>;
  }

  const handleChange = (e) => {
    setStatus(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      await axios.patch(`/api/updateUser/${user.contactId}`, form);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: "username", label: "Username", type: "text", placeholder: "Your username" },
    { name: "firstname", label: "First Name", type: "text", placeholder: "First name" },
    { name: "surname", label: "Last Name", type: "text", placeholder: "Last name" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "Phone number" },
  ];

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ name, label, type, placeholder }) => (
          <div key={name} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">{label}</label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              placeholder={placeholder}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
            />
          </div>
        ))}
      </div>

      {/* Email (read-only) */}
      <div className="flex flex-col gap-1 mt-5">
        <label className="text-sm font-medium text-gray-600">Email</label>
        <input
          type="email"
          value={user?.loginEmail || ""}
          readOnly
          className="border border-gray-100 bg-gray-50 rounded-lg px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`mt-8 px-8 py-2.5 rounded-lg text-white text-sm font-medium transition ${
          isLoading
            ? "bg-pink-300 cursor-not-allowed"
            : "bg-[#D02E64] hover:bg-[#b02555] active:scale-95"
        }`}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>

      {status === "success" && (
        <p className="mt-4 text-green-600 text-sm font-medium">Profile updated successfully.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-500 text-sm font-medium">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
