"use client";

import { MyWixClientContext } from "@/context/wixContext";
import { useContext } from "react";

export const useWixClient = () => {
  return useContext(MyWixClientContext);
};
