import { wixClientServer } from "@/lib/wixClientServer";
import { unstable_cache } from "next/cache";
import ProductList from "@/components/ProductList";
import SkeletonLoader from "@/components/SkeletonLoader";
import ShopFilters from "@/components/ShopFilters";
import ShopSearch from "@/components/ShopSearch";
import { Suspense } from "react";
import Link from "next/link";

const getCategories = unstable_cache(
  async () => {
    const wixClient = await wixClientServer();
    const res = await wixClient.collections.queryCollections().find();
    return res.items.map((c) => ({ _id: c._id, name: c.name, slug: c.slug }));
  },
  ["shop-categories"],
  { revalidate: 3600 }
);

export default async function ShopPage({ searchParams }) {
  let categories = [];
  let activeCat  = null;

  try {
    categories = await getCategories();
    const slug = searchParams?.cat || "all-products";
    activeCat  = categories.find((c) => c.slug === slug) || categories[0];
  } catch (e) {
    console.log(e);
  }

  const categoryId = activeCat?._id || process.env.FEATURED_PRODUCT_CATEGORY_ID;

  // Build active filter summary for display
  const activeFilters = [
    searchParams?.Type   && `Type: ${searchParams.Type}`,
    searchParams?.min    && `Min $${searchParams.min}`,
    searchParams?.max    && `Max $${searchParams.max}`,
    searchParams?.SortBy && `Sort: ${searchParams.SortBy.replace("asc ", "↑ ").replace("desc ", "↓ ")}`,
    searchParams?.name   && `"${searchParams.name}"`,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="relative bg-gradient-to-r from-[#D02E64] to-[#7c1d3f] overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="absolute -bottom-10 right-[15%] w-52 h-52 bg-white/5 rounded-full" />

        <div className="relative z-10 px-[10%] py-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div>
            <p className="text-pink-200 text-xs font-semibold uppercase tracking-widest mb-2">
              {activeCat?.name || "All Products"}
            </p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3">
              {activeCat?.name === "all-products" || !activeCat
                ? "Our Shop"
                : activeCat.name}
            </h1>
            <p className="text-pink-100 text-sm max-w-sm">
              Discover thousands of products. New arrivals every week.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex gap-2 flex-wrap">
            <Link href="/deals"
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-medium rounded-xl transition">
              🔥 Deals
            </Link>
            <Link href="/list?cat=all-products"
              className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-medium rounded-xl transition">
              🗂 Browse All
            </Link>
          </div>
        </div>
      </div>

      <div className="px-[10%] py-8">
        {/* Search bar */}
        <div className="mb-5">
          <ShopSearch defaultValue={searchParams?.name || ""} />
        </div>

        {/* Filters */}
        <ShopFilters categories={categories} searchParams={searchParams} />

        {/* Results header */}
        <div className="flex items-center justify-between mt-7 mb-5">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-gray-800">
              {activeCat?.name || "All Products"}
            </h2>
            {activeFilters.map((f) => (
              <span key={f} className="text-xs bg-pink-50 text-[#D02E64] border border-pink-100 px-2.5 py-1 rounded-full font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Products */}
        <Suspense key={JSON.stringify(searchParams)} fallback={<SkeletonLoader count={12} />}>
          <ProductList
            type="list"
            categoryId={categoryId}
            searchParams={searchParams}
            limit={12}
          />
        </Suspense>
      </div>
    </div>
  );
}
