"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slider = [
  {
    id: 1,
    title: "Winter Sale Collection",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1600",

    url: "/summer-sale",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Warmers",
    description: "Stay cozy with discounts up to 40%!",
    img: "https://images.pexels.com/photos/14996824/pexels-photo-14996824/free-photo-of-man-in-black-hoodie-with-skateboard-at-night.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    url: "/winter-warmers",
    bg: "bg-gradient-to-r from-blue-50 to-gray-50",
  },
  {
    id: 3,
    title: "Spring Fresh Arrivals",
    description: "New arrivals with up to 30% off!",
    img: "https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1600",
    url: "/spring-fresh",
    bg: "bg-gradient-to-r from-green-50 to-teal-50",
  },
  {
    id: 4,
    title: "Spring Fresh Arrivals",
    description: "New arrivals with up to 30% off!",
    url: "/spring-fresh",
    img: "https://images.pexels.com/photos/720606/pexels-photo-720606.jpeg?auto=compress&cs=tinysrgb&w=1600",

    bg: "bg-gradient-to-r from-green-50 to-teal-50",
  },
];

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleSlide = (index) => {
    setCurrentSlide(index);
    console.log(currentSlide);
  };

  // useEffect(() => {
  //   const sliderInterval = setInterval(() => {
  //     if (currentSlide === slider.length - 1) {
  //       setCurrentSlide(0);
  //       console.log("first");
  //     } else {
  //       setCurrentSlide(currentSlide + 1);
  //       console.log("second");
  //       console.log(currentSlide);
  //     }
  //   }, 3000);

  //   return () => clearInterval(sliderInterval);
  // }, [currentSlide]);
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
              className="ring ring-gray-900 rounded-full p-2 cursor-pointer"
            >
              {index == currentSlide && (
                <span className="bg-gray-900 w-2 h-2 rounded-full flex justify-center items-center "></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
