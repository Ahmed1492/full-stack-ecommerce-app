import Image from "next/image";
import Link from "next/link";

const TEAM = [
  { name: "Ahmed Mohamed", role: "Founder & CEO", initials: "AM" },
  { name: "Sara Hassan", role: "Head of Design", initials: "SH" },
  { name: "Omar Khalil", role: "Lead Developer", initials: "OK" },
  { name: "Nour Ali", role: "Marketing Director", initials: "NA" },
];

const STATS = [
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products" },
  { value: "120+", label: "Brands" },
  { value: "4.9★", label: "Average Rating" },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Quality First",
    desc: "Every product is carefully curated and quality-checked before it reaches you.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "We partner with top logistics providers to get your order to you quickly.",
  },
  {
    icon: "🔒",
    title: "Secure Shopping",
    desc: "Your data and payments are always protected with industry-standard encryption.",
  },
  {
    icon: "💬",
    title: "24/7 Support",
    desc: "Our team is always here to help you with any questions or concerns.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#D02E64] to-[#7c1d3f] py-20 px-[10%] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <p className="text-pink-200 text-sm font-medium mb-3 uppercase tracking-widest">Our Story</p>
        <h1 className="text-5xl font-bold text-white mb-4">About Us</h1>
        <p className="text-pink-100 max-w-xl mx-auto text-sm leading-relaxed">
          We started with a simple idea — make great fashion accessible to everyone.
          Today we serve thousands of happy customers worldwide.
        </p>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-[10%] py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-[#D02E64]">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-[10%] py-16">
        {/* Mission */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
          <div className="flex-1">
            <p className="text-[#D02E64] text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              Fashion that fits your life,<br />not the other way around.
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              We believe everyone deserves to look and feel their best without breaking the bank.
              Our platform connects you with the best brands and independent designers from around the world.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed">
              From everyday essentials to statement pieces, we&apos;ve got something for every style,
              every occasion, and every budget.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-6 px-6 py-3 bg-[#D02E64] text-white rounded-xl text-sm font-semibold hover:bg-[#b02555] transition"
            >
              Explore the Shop
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            {["bg-pink-100", "bg-indigo-100", "bg-yellow-100", "bg-green-100"].map((bg, i) => (
              <div key={i} className={`${bg} rounded-2xl h-36 flex items-center justify-center text-4xl`}>
                {["👗", "👟", "👜", "🧢"][i]}
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <p className="text-[#D02E64] text-sm font-semibold uppercase tracking-widest mb-2 text-center">Why Us</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md hover:border-[#D02E64] transition">
                <span className="text-3xl mb-4 block">{v.icon}</span>
                <h3 className="font-semibold text-gray-800 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <p className="text-[#D02E64] text-sm font-semibold uppercase tracking-widest mb-2 text-center">The People</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center hover:shadow-md transition">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D02E64] to-[#a0204a] text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {member.initials}
                </div>
                <p className="font-semibold text-gray-800 text-sm">{member.name}</p>
                <p className="text-gray-400 text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#D02E64] to-[#a0204a] rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to start shopping?</h3>
          <p className="text-pink-100 text-sm mb-6">Join thousands of happy customers today.</p>
          <Link
            href="/shop"
            className="inline-block bg-white text-[#D02E64] font-semibold px-8 py-3 rounded-xl text-sm hover:bg-pink-50 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
