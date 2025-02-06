import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

export default async function ProductList({ categoryId, limit, searchParams }) {
  const wixClient = await wixClientServer();
  const res = await wixClient?.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || 20)
    .find();
  console.log(res.items);

  return (
    <div className="flex items-center gap-x-2 gap-y-9 justify-between flex-wrap ">
      {res.items.map((item, index) => (
        <Link
          key={index}
          href={`/product/${item.slug}`}
          className="w-[100%]  md:w-[40%] lg:w-[30%] xl:w-[22%] h-max"
        >
          {/* IMAGE */}
          <div className="w-full relative h-80">
            <Image
              src={item?.media?.mainMedia.image.url || "/product.png"}
              alt=""
              className="cursor-pointer  object-cover rounded-md absolute z-30 hover:opacity-0 duration-500 ease-in-out "
              fill
              sizes="100%"
            />
            {item?.media.items && (
              <Image
                src={item.media.items[1]?.image.url || "/product.png"}
                alt=""
                className="cursor-pointer  object-cover rounded-md absolute"
                fill
                sizes="100%"
              />
            )}
          </div>
          {/* DESCRIPTION */}
          <div className="flex items-center justify-between mt-3">
            <span className="font-bold ">{item.name}</span>
            <span className="font-bold ">${item.price?.price}</span>
          </div>
          {item.additionalInfoSections && (
            <div
              className="text-gray-500 text-sm mt-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  item.additionalInfoSections.find(
                    (section) => section?.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            />
          )}
          <button className="px-4 text-sm  py-2 bg-transparent border border-red-400 text-red-400 rounded-2xl mt-2">
            Add To Cart
          </button>
        </Link>
      ))}
    </div>
  );
}
