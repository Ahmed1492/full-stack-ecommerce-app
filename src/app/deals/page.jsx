import Image from "next/image";
import Link from "next/link";

const DEALS = [
  {
    id: 1,
    title: "Summer Sale",
    discount: "Up to 50% OFF",
    description: "Fresh styles for the season. Limited time only.",
    badge: "HOT",
    badgeColor: "bg-red-500",
    gradient: "from-orange-400 to-pink-500",
    expires: "Ends June 30",
  },
  {
    id: 2,
    title: "New Arrivals",
    discount: "20% OFF",
    description: "Be the first to wear the latest drops.",
    badge: "NEW",
    badgeColor: "bg-blue-500",
    gradient: "from-blue-400 to-indigo-500",
    expires: "While stocks last",
  },
  {
    id: 3,
    title: "Bundle & Save",
    discount: "Buy 2 Get 1 Free",
    description: "Mix and match from any category.",
    badge: "DEAL",
    badgeColor: "bg-green-500",
    gradient: "from-green-400 to-teal-500",
    expires: "Ongoing",
  },
  {
    id: 4,
    title: "Flash Sale",
    discount: "Up to 70% OFF",
    description: "24-hour deals on selected items. Don't miss out.",
    badge: "FLASH",
    badgeColor: "bg-yellow-500",
    gradient: "from-yellow-400 to-orange-500",
    expires: "Today only",
  },
];

const FEATURED_PRODUCTS = [
  { id: 1, name: "Classic White Tee", originalPrice: 49, salePrice: 24, category: "Men" },
  { id: 2, name: "Floral Summer Dress", originalPrice: 89, salePrice: 44, category: "Women" },
  { id: 3, name: "Slim Fit Chinos", originalPrice: 79, salePrice: 39, category: "Men" },
  { id: 4, name: "Leather Crossbody Bag", originalPrice: 129, salePrice: 64, category: "Accessories" },
  { id: 5, name: "Kids Denim Jacket", originalPrice: 59, salePrice: 29, category: "Kids" },
  { id: 6, name: "Running Sneakers", originalPrice: 119, salePrice: 59, category: "Footwear" },
];

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#D02E64] to-[#7c1d3f] py-16 px-[10%] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute left-1/3 bottom-0 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <p className="text-pink-200 text-sm font-medium mb-2 uppercase tracking-widest">Limited Time</p>
        <h1 className="text-4xl font-bold text-white mb-3">Hot Deals 🔥</h1>
        <p className="text-pink-100 text-sm max-w-md">
          Exclusive discounts and offers updated weekly. Grab them before they're gone.
        </p>
      </div>

      <div className="px-[10%] py-12">
        {/* Deal Cards */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">Current Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className={`bg-gradient-to-br ${deal.gradient} rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform`}
            >
              <div className="absolute top-4 right-4">
                <span className={`${deal.badgeColor} text-white text-[10px] font-bold px-2 py-1 rounded-full`}>
                  {deal.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-1">{deal.title}</h3>
              <p className="text-2xl font-extrabold mb-2">{deal.discount}</p>
              <p className="text-white/80 text-xs mb-4">{deal.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-xs">{deal.expires}</span>
                <Link
                  href="/shop"
                  className="bg-white/20 hover:bg-white/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                >
                  Shop Now →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sale Products */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">On Sale Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {FEATURED_PRODUCTS.map((p) => {
            const pct = Math.round(((p.originalPrice - p.salePrice) / p.originalPrice) * 100);
            return (
              <Link
                key={p.id}
                href="/shop"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-[#D02E64] transition group"
              >
                <div className="w-full h-28 bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
                  <Image src="/product.png" alt="" width={60} height={60} className="object-contain opacity-40" />
                </div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wide">{p.category}</span>
                <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate group-hover:text-[#D02E64] transition">
                  {p.name}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[#D02E64] font-bold text-sm">${p.salePrice}</span>
                  <span className="text-gray-400 line-through text-xs">${p.originalPrice}</span>
                  <span className="ml-auto text-[10px] bg-red-100 text-red-500 font-bold px-1.5 py-0.5 rounded-full">
                    -{pct}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-gradient-to-r from-[#D02E64] to-[#a0204a] rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Never Miss a Deal</h3>
          <p className="text-pink-100 text-sm mb-6">Subscribe and get exclusive offers straight to your inbox.</p>
          <div className="flex justify-center gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2.5 rounded-xl text-gray-800 text-sm outline-none"
            />
            <button className="bg-white text-[#D02E64] font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-pink-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
