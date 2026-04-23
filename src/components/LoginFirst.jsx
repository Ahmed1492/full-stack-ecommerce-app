"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function LoginFirst() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className=" my-[4rem] text-xl">Loggin First!</div>;
}
