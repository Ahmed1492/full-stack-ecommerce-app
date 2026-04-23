"use client";
import React, { useState } from "react";
import ProfileUpdateForm from "@/components/ProfileUpdateForm";
import ProfileOrders from "@/components/ProfileOrders";
import Image from "next/image";

export default function ProfileClient({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  const nickname = user?.profile?.nickname || user?.loginEmail || "User";
  const initials = nickname.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#d02e64] to-[#a0204a] h-36" />

      <div className="max-w-5xl mx-auto px-4 -mt-16 pb-16">
        {/* Avatar + Name */}
        <div className="flex items-end gap-5 mb-6">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-[#D02E64] text-3xl font-bold select-none">
            {initials}
          </div>
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-white">{nickname}</h1>
            <p className="text-gray-500 text-sm">{user?.loginEmail}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-8">
          {["profile", "orders"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#D02E64] text-[#D02E64]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab === "orders" ? "My Orders" : "Edit Profile"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {activeTab === "profile" ? (
            <ProfileUpdateForm user={user} />
          ) : (
            <ProfileOrders userId={user?.contactId || user?._id} />
          )}
        </div>
      </div>
    </div>
  );
}
