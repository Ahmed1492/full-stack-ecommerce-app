import Image from "next/image";
import React from "react";
import ProductImage from "@/components/ProductImage";
import CustomizeProduct from "@/components/CustomizeProduct";
import AddProduct from "@/components/AddProduct";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
export default async function SingleProduct({ params }) {
  const wixClient = await wixClientServer();
  let products;
  let product;
  try {
    products = await wixClient?.products
      .queryProducts()
      .eq("slug", params.id)
      .find();
    // console.log(product.items);
    if (!products?.items[0]) return notFound();

    product = products?.items[0];
  } catch (error) {
    return notFound();
  }

  return (
    <div className="flex justify-center relative lg:justify-between  gap-y-12 flex-wrap   px-[10%] ">
      {/* IMAGES */}
      <div className="w-full md:w-[90%] lg:sticky h-max top-40   lg:w-[50%] xl:w-[38%] ">
        <ProductImage items={product.media.items} />
      </div>
      {/* DESCRIPTIONS */}
      <div className="w-full md:w-[90%] lg:w-[44%] xl:w-[55%] ">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <p className="font-medium tdext-sm text-gray-500 ">
            {product?.description}
          </p>
          <div className="h-[2px] bg-gray-100" />
          {product.price.price == product.price.discountedPrice ? (
            <div className="flex items-center gap-4">
              <span className="text-2xl text-gray-800">
                ${product.price.price}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <del className="text-2xl text-gray-500">
                ${product.price.price}
              </del>
              <span className="text-2xl text-gray-900 font-bold">
                ${product.price.discountedPrice}
              </span>
            </div>
          )}
          <div className="h-[2px] bg-gray-100" />
          {product.variants && product.productOptions ? (
            <CustomizeProduct
              productId={product?._id}
              variants={product?.variants}
              productOptions={product?.productOptions}
              stockNumber={product.stock.quantity || 0}
            />
          ) : (
            <AddProduct
              productId={product?._id}
              variantId="00000000-0000-0000-0000-000000000000"
              stockNumber={product.stock.quantity || 0}
            />
          )}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          <div className="flex flex-col gap-8">
            {product.additionalInfoSections.map((section) => {
              // console.log("section", section);
              if (section.title !== "shortDesc")
                return (
                  <div key={section.title} className="flex flex-col gap-2">
                    <h2 className="text-2xl font-medium">{section.title}</h2>
                    <p className="tracking-wide">{section.description}</p>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
