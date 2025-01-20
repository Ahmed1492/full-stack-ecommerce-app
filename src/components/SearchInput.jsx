"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    if (name) {
      router.push(`/list?name=${name}`);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="bg-gray-100 flex justify-between items-center  md:w-3/4 lg:w-4/5 xl:w-3/5 p-2 rounded-md"
    >
      <input
        type="text"
        name="name"
        placeholder="Search..."
        className="bg-transparent border-none outline-none"
      />
      <button>
        <Image src="/search.png" alt="" width={16} height={16} />
      </button>
    </form>
  );
}
