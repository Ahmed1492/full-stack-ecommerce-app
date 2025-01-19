"use client";
import Image from "next/image";
export default function NavIcons() {
  return (
    <div className="flex items-center  gap-6">
      <Image src="/profile.png" alt="" width={22} height={22} />
      <Image src="/notification.png" alt="" width={22} height={22} />
      <Image src="/cart.png" alt="" width={22} height={22} />
    </div>
  );
}
