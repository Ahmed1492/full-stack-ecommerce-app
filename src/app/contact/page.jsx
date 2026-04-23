import Image from "next/image";

const CONTACT_INFO = [
  { icon: "📧", label: "Email", value: "support@ecommerce.com", sub: "We reply within 24 hours" },
  { icon: "📞", label: "Phone", value: "+123 456 7890", sub: "Mon–Fri, 9am–6pm" },
  { icon: "📍", label: "Address", value: "Cairo, Egypt", sub: "Visit our showroom" },
];

const FAQS = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–7 business days. Express options are available at checkout." },
  { q: "Can I return an item?", a: "Yes, we offer free returns within 30 days of purchase for all unused items." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive a tracking link via email." },
  { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries worldwide." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-[#D02E64] to-[#7c1d3f] py-16 px-[10%]">
        <p className="text-pink-200 text-sm font-medium mb-2 uppercase tracking-widest">Get in Touch</p>
        <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-pink-100 text-sm max-w-md">
          Have a question or need help? We&apos;re here for you. Reach out and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="px-[10%] py-14">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT — Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h2>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-600">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-600">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-600">Subject</label>
                  <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition bg-white text-gray-600">
                    <option>Order Issue</option>
                    <option>Return & Refund</option>
                    <option>Product Question</option>
                    <option>Shipping</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-600">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#D02E64] focus:ring-1 focus:ring-[#D02E64] transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#D02E64] text-white rounded-xl font-semibold text-sm hover:bg-[#b02555] active:scale-[0.99] transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT — Info + FAQ */}
          <div className="w-full lg:w-80 flex flex-col gap-5">
            {/* Contact Info Cards */}
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4 hover:border-[#D02E64] transition">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{info.label}</p>
                  <p className="text-sm font-semibold text-gray-800 mt-0.5">{info.value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{info.sub}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-700 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {["/facebook.png", "/instagram.png", "/x.png", "/youtube.png"].map((src) => (
                  <div key={src} className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:border-[#D02E64] hover:bg-pink-50 transition cursor-pointer">
                    <Image src={src} alt="" width={16} height={16} className="object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <p className="text-[#D02E64] text-sm font-semibold uppercase tracking-widest mb-2 text-center">FAQ</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-[#D02E64] transition">
                <p className="font-semibold text-gray-800 text-sm mb-2">{faq.q}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
