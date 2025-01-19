"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden sm:flex">
      <Image
        src="/menu.png"
        width={28}
        height={28}
        alt=""
        className="cursor-pointer z-30 "
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <div className="flex flex-col gap-7 items-center justify-center text-white bg-black z-20  absolute left-0 right-0 top-20 bottom-0 text-2xl">
          <Link href="/">HomePage</Link>
          <Link href="/">Shop</Link>
          <Link href="/">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/">Logout</Link>
          <Link href="/">Cart(1)</Link>
        </div>
      )}
    </div>
  );
}
