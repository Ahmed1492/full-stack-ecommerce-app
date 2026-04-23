import Link from "next/link";
import Menu from "@/components/Menu";
import SearchInput from "@/components/SearchInput";
import NavIcons from "@/components/NavIcons";
import NavLinks from "@/components/NavLinks";
import Image from "next/image";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <div className="h-20 sticky top-0 shadow-sm border-b border-gray-100 z-50 bg-white/95 backdrop-blur-sm px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-[10%]">
      <div className="flex items-center justify-between h-full">
        {/* MOBILE */}
        <div className="flex items-center justify-between w-full md:hidden">
          <Link className="text-xl font-bold tracking-tight flex items-center gap-2" href="/">
            <Image src="/logo.png" alt="" width={22} height={22} />
            <span className="text-[#D02E64]">Tren<span className="text-gray-900">ova</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Suspense fallback={null}>
              <NavIcons />
            </Suspense>
            <Menu />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center justify-between w-full gap-6">
          {/* Logo */}
          <Link className="text-xl font-bold tracking-tight flex items-center gap-2 flex-shrink-0" href="/">
            <Image src="/logo.png" alt="" width={22} height={22} />
            <span className="text-[#D02E64]">Tren<span className="text-gray-900">ova</span></span>
          </Link>

          {/* Nav Links — client for active state */}
          <NavLinks />

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <SearchInput />
            <Suspense fallback={null}>
              <NavIcons />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
