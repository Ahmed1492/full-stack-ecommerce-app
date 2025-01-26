import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex  lg:justify-between gap-5f\  gap-y-20 flex-wrap justify-center  px-[10%] py-[4%] bg-slate-100 mt-24">
      {/* LEFT */}
      <div className="w-[100%] md:w-[50%] text-center lg:text-left   lg:w-[25%] bg-redd-600">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-medium tracking-wide">Ecommerce</h2>
          <p className="font-medium text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            dicta. Enim recusandae rem saepe!
          </p>
          <span className="my-3 font-bold">test123@gmail.com</span>
          <span className="font-bold text-sm">+123 456 542</span>
        </div>
        {/* ICONS */}
        <div className="mt-5 flex items-center justify-center lg:justify-start gap-6 flex-wrap">
          <Image
            src="/facebook.png"
            alt=""
            width={17}
            height={17}
            className="object-cover"
          />
          <Image
            src="/instagram.png"
            alt=""
            width={17}
            height={17}
            className="object-cover"
          />
          <Image
            src="/youtube.png"
            alt=""
            width={17}
            height={17}
            className="object-cover"
          />
          <Image
            src="/x.png"
            alt=""
            width={17}
            height={17}
            className="object-cover"
          />
        </div>
        <div className="font-bold mt-8 text-sm">@ 2025 By Ahmed Mohamed</div>
      </div>
      {/* CENTER */}
      <div className="w-[100%] md:w-[50%]  lg:w-[50%] flex justify-center  bg-bdlue-600">
        <div className="flex justify-around text-sm w-full fledx-wrap">
          {/* COMPANY */}
          <div className="flex   flex-col gap-4">
            <h2 className="mb-12 text-xl font-bold">COMPANY</h2>
            <span>About Us</span>
            <span>Content</span>
            <span>Blog</span>
            <span>Sponsers</span>
            <span>Contact Us</span>
          </div>
          {/* SHOP */}
          <div className="flex flex-col gap-4">
            <h2 className="mb-12 text-xl font-bold">SHOP</h2>
            <span>About Us</span>
            <span>Content</span>
            <span>Blog</span>
            <span>Sponsers</span>
            <span>Contact Us</span>
          </div>
          {/* HELP */}
          <div className="flex flex-col gap-4">
            <h2 className="mb-12 text-xl font-bold">HELP</h2>
            <span>About Us</span>
            <span>Content</span>
            <span>Blog</span>
            <span>Sponsers</span>
            <span>Contact Us</span>
          </div>
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-[100%] md:w-[50%] text-center lg:text-left   lg:w-[25%] bg-gdreen-700">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold">SUBSCRIBE</h2>
          <p className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
            exercitationem est ex perferendis ratione voluptas et optio!
          </p>
          <div className="flex justify-center lg:justify-start ">
            <input type="text" placeholder="Email address" className="p-3" />
            <button className="p-3 bg-[#d02e64] text-white">JOIN</button>
          </div>
          <span className="text-sm  font-bold my-5">Secure Payment</span>
          <div className="mt-5 flex items-center justify-center lg:justify-start gap-6">
            <Image
              src="/mastercard.png"
              alt=""
              width={44}
              height={44}
              className="object-cover"
            />
            <Image
              src="/paypal.png"
              alt=""
              width={44}
              height={44}
              className="object-cover"
            />
            <Image
              src="/visa.png"
              alt=""
              width={44}
              height={44}
              className="object-cover"
            />
            <Image
              src="/skrill.png"
              alt=""
              width={44}
              height={44}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
