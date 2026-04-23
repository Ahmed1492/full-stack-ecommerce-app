import Image from "next/image";
import Link from "next/link";

const LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Blog", href: "/" },
    { label: "Press", href: "/" },
    { label: "Contact Us", href: "/contact" },
  ],
  Shop: [
    { label: "All Products", href: "/list?cat=all-products" },
    { label: "Deals", href: "/deals" },
    { label: "New Arrivals", href: "/shop" },
    { label: "Best Sellers", href: "/shop" },
    { label: "Sale", href: "/deals" },
  ],
  Help: [
    { label: "FAQ", href: "/contact" },
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns", href: "/contact" },
    { label: "Track Order", href: "/orders" },
    { label: "Support", href: "/contact" },
  ],
};

const SOCIALS = [
  { src: "/facebook.png", alt: "Facebook", href: "#" },
  { src: "/instagram.png", alt: "Instagram", href: "#" },
  { src: "/youtube.png", alt: "YouTube", href: "#" },
  { src: "/x.png", alt: "X", href: "#" },
  { src: "/pinterest.png", alt: "Pinterest", href: "#" },
];

const PAYMENTS = [
  { src: "/visa.png", alt: "Visa" },
  { src: "/mastercard.png", alt: "Mastercard" },
  { src: "/paypal.png", alt: "PayPal" },
  { src: "/skrill.png", alt: "Skrill" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 ">
      {/* Top bar */}
      <div className="border-b border-gray-800 px-[10%] py-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D02E64] flex items-center justify-center">
              <Image src="/logo.png" alt="" width={18} height={18} />
            </div>
            <span className="text-white text-xl font-bold tracking-tight">Tren<span className="text-pink-300">ova</span></span>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <p className="text-sm text-gray-400 whitespace-nowrap">Stay in the loop —</p>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-64 bg-gray-800 border border-gray-700 text-white text-sm px-4 py-2.5 rounded-l-xl outline-none focus:border-[#D02E64] transition placeholder:text-gray-600"
              />
              <button className="bg-[#D02E64] hover:bg-[#b02555] text-white text-sm font-semibold px-5 py-2.5 rounded-r-xl transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="px-[10%] py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="flex flex-col gap-5">
          <p className="text-sm text-gray-400 leading-relaxed">
            Your go-to destination for fashion, accessories, and lifestyle products — curated with care.
          </p>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Email</p>
            <a href="mailto:support@trenova.com" className="text-sm text-gray-300 hover:text-white transition">
              support@trenova.com
            </a>
          </div>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Phone</p>
            <a href="tel:+1234567890" className="text-sm text-gray-300 hover:text-white transition">
              +123 456 7890
            </a>
          </div>
          {/* Socials */}
          <div className="flex items-center gap-2 mt-1">
            {SOCIALS.map(({ src, alt, href }) => (
              <a
                key={alt}
                href={href}
                className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-[#D02E64] flex items-center justify-center transition group"
                aria-label={alt}
              >
                <Image src={src} alt={alt} width={14} height={14} className="object-contain opacity-60 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([title, items]) => (
          <div key={title} className="flex flex-col gap-4">
            <h3 className="text-white text-sm font-semibold uppercase tracking-widest">
              {title}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {items.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 px-[10%] py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-600">
          © 2025 Trenova by Ahmed Mohamed. All rights reserved.
        </p>

        {/* Payment icons */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 mr-1">Secure payments:</span>
          {PAYMENTS.map(({ src, alt }) => (
            <div
              key={alt}
              className="bg-gray-800 rounded-lg px-2 py-1.5 flex items-center justify-center"
            >
              <Image src={src} alt={alt} width={32} height={20} className="object-contain opacity-70" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
