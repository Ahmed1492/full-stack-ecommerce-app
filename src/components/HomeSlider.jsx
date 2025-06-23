"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slider = [
  {
    id: 1,
    title: "Winter Sale Collection",
    description: "Sale! Up to 50% off!",

    img: "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?_gl=1*44puyi*_ga*Njc2NzgwMDA5LjE3NDc2NzQ1OTk.*_ga_8JE65Q40S6*czE3NTA2MzExMTQkbzQkZzEkdDE3NTA2MzEyMDMkajQxJGwwJGgw",

    url: "/summer-sale",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Summer Warmers",
    description: "Stay cozy with discounts up to 40%!",
    img: "https://images.pexels.com/photos/5531551/pexels-photo-5531551.jpeg?_gl=1*14zkx42*_ga*Njc2NzgwMDA5LjE3NDc2NzQ1OTk.*_ga_8JE65Q40S6*czE3NTA2MzExMTQkbzQkZzEkdDE3NTA2MzE0NDQkajYwJGwwJGgw",
    url: "/winter-warmers",
    bg: "bg-gradient-to-r from-blue-50 to-gray-50",
  },
  {
    id: 3,
    title: "Spring Fresh Arrivals",
    description: "New arrivals with up to 30% off!",

    img: "https://images.pexels.com/photos/29906028/pexels-photo-29906028.jpeg?_gl=1*112cyfa*_ga*Njc2NzgwMDA5LjE3NDc2NzQ1OTk.*_ga_8JE65Q40S6*czE3NTA2MzExMTQkbzQkZzEkdDE3NTA2MzEyOTEkajYwJGwwJGgw",
    url: "/spring-fresh",
    bg: "bg-gradient-to-r from-green-50 to-teal-50",
  },
  {
    id: 4,
    title: "Spring Fresh Arrivals",
    description: "New arrivals with up to 30% off!",
    url: "/spring-fresh",
    img: "https://images.pexels.com/photos/15658380/pexels-photo-15658380.jpeg?_gl=1*185zqvo*_ga*Njc2NzgwMDA5LjE3NDc2NzQ1OTk.*_ga_8JE65Q40S6*czE3NTA2MzExMTQkbzQkZzEkdDE3NTA2MzIyNzgkajI2JGwwJGgw",

    bg: "bg-gradient-to-r from-green-50 to-teal-50",
  },
];

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleSlide = (index) => {
    setCurrentSlide(index);
    console.log(currentSlide);
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      if (currentSlide === slider.length - 1) {
        setCurrentSlide(0);
        console.log("first");
      } else {
        setCurrentSlide(currentSlide + 1);
        console.log("second");
        console.log(currentSlide);
      }
    }, 2000);

    return () => clearInterval(sliderInterval);
  }, [currentSlide]);
  return (
    <div className="overflow-x-hidden w-screen   flex customHeight">
      <div className={`w-max h-full flex `}>
        {slider.map((slide, index) => (
          <div
            key={slide.id}
            className={`flex w-screen ease-in-out duration-1000   flex-col lg:flex-row h-full bg-dred-500 relative`}
            style={{ translate: `calc(-100vw * ${currentSlide})` }}
          >
            {/* LEFT */}
            <div
              className={`${slide.bg} lg:w-1/2 flex flex-col gap-8 justify-center items-center text-center  w-full h-full  bwg-red-600 `}
            >
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-bold  w-3/4">
                {slide.title}
              </h1>
              <Link
                className="bg-black font-medium py-2 px-3 rounded-lg text-white "
                href={slide.url}
              >
                <button>SHOP NOW</button>
              </Link>
            </div>
            {/* RIGHT */}
            <div className="lg:w-1/2  w-full  h-full   relative ">
              <Image
                className="object-cover"
                src={slide.img}
                alt=""
                fill
                sizes="100%"
              />
            </div>
          </div>
        ))}
        <div className="absolute bottom-20 right-[50%] translate-x-1/2 flex items-center justify-center gap-6">
          {slider.map((slide, index) => (
            <div
              onClick={() => handleSlide(index)}
              key={slide.id}
              className="ring ring-[#6f696c] rounded-full p-2 cursor-pointer"
            >
              {index == currentSlide && (
                <span className="bg-[#D02E64] w-2 h-2 rounded-full flex justify-center items-center "></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
