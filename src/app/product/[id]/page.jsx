import Image from "next/image";
import React from "react";
import ProductImage from "@/components/ProductImage";
import CustomizeProduct from "@/components/CustomizeProduct";
import AddProduct from "@/components/AddProduct";
export default function SingleProduct() {
  return (
    <div className="flex justify-center relative lg:justify-between  gap-y-12 flex-wrap   px-[10%] ">
      {/* IMAGES */}
      <div className="w-full md:w-[90%] lg:sticky h-max top-40   lg:w-[50%] xl:w-[38%] ">
        <ProductImage />
      </div>
      {/* DESCRIPTIONS */}
      <div className="w-full md:w-[90%] lg:w-[44%] xl:w-[55%] ">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-medium">Product Name</h1>
          <p className="font-medium tdext-sm text-gray-500 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore ut
            nihil excepturi illo dolore beatae deserunt ipsum dignissimos
            expedita! Nam dolore culpa non qui maxime repellat sapiente
            praesentium magnam modi?
          </p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4">
            <del className="text-2xl text-gray-500">$59</del>
            <span className="text-2xl text-gray-900 font-bold">$49</span>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProduct />
          <AddProduct />
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">TiTle</h2>
              <p className="tracking-wide">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Distinctio laboriosam illum architecto odit, ea repellat debitis
                ipsa labore facere dignissimos aliquid impedit pariatur deserunt
                soluta autem, cumque asperiores qui deleniti!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
