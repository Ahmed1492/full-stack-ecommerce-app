import HomeSlider from "@/components/HomeSlider";
import ProductList from "@/components/ProductList";
import SkeletonLoader from "@/components/SkeletonLoader";
import CategoryList from "@/components/CategoryList";
import { Suspense } from "react";
import Link from "next/link";

const HomePage = async () => {
  return (
    <div className="overflow-hidden">
      {/* SLIDER */}
      <HomeSlider />

      {/* FEATURED PRODUCTS */}
      <section className="px-[10%] mt-20">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D02E64] mb-1">Handpicked</p>
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#D02E64] hover:underline font-medium">
            View all →
          </Link>
        </div>
        <Suspense fallback={<SkeletonLoader count={4} />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
            searchParams={undefined}
            type={undefined}
          />
        </Suspense>
      </section>

      {/* PROMO BANNER */}
      <section className="px-[10%] mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { emoji: "🚚", title: "Free Shipping", sub: "On all orders over $50", bg: "from-blue-50 to-indigo-50" },
            { emoji: "🔥", title: "Hot Deals Daily", sub: "New discounts every day", bg: "from-pink-50 to-rose-50" },
            { emoji: "↩️", title: "Easy Returns", sub: "30-day hassle-free returns", bg: "from-green-50 to-emerald-50" },
          ].map((b) => (
            <div key={b.title} className={`bg-gradient-to-br ${b.bg} rounded-2xl px-6 py-5 flex items-center gap-4 border border-white shadow-sm`}>
              <span className="text-3xl">{b.emoji}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{b.title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mt-20">
        <div className="px-[10%] flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D02E64] mb-1">Browse</p>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          </div>
          <Link href="/list?cat=all-products" className="text-sm text-[#D02E64] hover:underline font-medium">
            All categories →
          </Link>
        </div>
        <CategoryList />
      </section>

      {/* NEW ARRIVALS */}
      <section className="px-[10%] mt-20 mb-20">
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#D02E64] mb-1">Just In</p>
            <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
          </div>
          <Link href="/shop" className="text-sm text-[#D02E64] hover:underline font-medium">
            View all →
          </Link>
        </div>
        <Suspense fallback={<SkeletonLoader count={8} />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={8}
            searchParams={undefined}
            type={undefined}
          />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
