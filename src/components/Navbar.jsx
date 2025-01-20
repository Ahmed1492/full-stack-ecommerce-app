import Link from "next/link";
import Menu from "@/components/Menu";
import SearchInput from "@/components/SearchInput";
import NavIcons from "@/components/NavIcons";
import Image from "next/image";
export default function Navbar() {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 pt-4 ">
      <div className="md:flex flex-wrap    items-center gap-9">
        {/*MOBILE SCREAN  */}
        <div className=" flex items-center justify-between h-full md:hidden">
          <Link className="text-2xl tracking-wide" href="/">
            Ecommerce
          </Link>
          <Menu />
        </div>
        {/* BIGGER SCREAN */}

        <div className="hidden md:flex justify-between items-center w-full  gap-4 h-full ">
          {/* LEFT */}
          <div className="w-1/z3">
            <div className="flex  items-center gap-12">
              <Link
                className="text-2xl tracking-wide flex items-center gap-3"
                href="/"
              >
                <Image src="/logo.png" alt="" width={22} height={22} />
                <span>Ecommerce</span>
              </Link>
              {/* LINKS */}
              <div className=" items-center font-medium gap-4 md:hidden lg:flex">
                <Link href="/">HomePage</Link>
                <Link href="/">Shop</Link>
                <Link href="/">Deals</Link>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className=" w-2/3">
            <div className="flex items-center justify-end gap-3">
              {/* INPUT */}
              <SearchInput />
              {/* ICONS */}
              <NavIcons />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
