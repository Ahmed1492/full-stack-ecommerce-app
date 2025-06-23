import Image from "next/image";
import React, { Suspense } from "react";
import ProductImage from "@/components/ProductImage";
import CustomizeProduct from "@/components/CustomizeProduct";
import SkeletonSingelPage from "@/components/SkeletonSingelPage";
import AddProduct from "@/components/AddProduct";
import Reviwes from "@/components/Reviwes";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { members } from "@wix/members";

export default async function SingleProduct({ params }) {
  const wixClient = await wixClientServer();
  let products;
  let product;
  let loading;
  try {
    loading = true;
    products = await wixClient?.products
      .queryProducts()
      .eq("slug", params.id)
      .find();
    // console.log(product.items);
    if (!products?.items[0]) return notFound();

    product = products?.items[0];
  } catch (error) {
    return notFound();
  } finally {
    loading = false;
  }

  const isLoggedIn = wixClient.auth.loggedIn();

  let member;
  if (isLoggedIn) {
    member = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
  }

  // console.log("========= single page =====");
  // console.log("product id", product._id);

  // console.log("=== single page =====");

  if (loading) {
    return <div>Loading........</div>;
  }

  {
    /* <SkeletonSingelPage /> */
  }
  return (
    <div className="flex justify-center relative  lg:justify-between  gap-y-12 flex-wrap   px-[10%] ">
      {/* IMAGES */}
      <div className="w-full md:w-[90%] lg:sticky h-max top-40   lg:w-[50%] xl:w-[38%] ">
        <ProductImage items={product.media.items} />
      </div>
      {/* DESCRIPTIONS */}
      <div className="w-full mt-[1rem] md:w-[90%] lg:w-[44%] xl:w-[55%] ">
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <span
            className="font-medium  text-gray-500"
            dangerouslySetInnerHTML={{ __html: product?.description }}
          ></span>
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
              variantId={
                item.variants[0]._id || "00000000-0000-0000-0000-000000000000"
              }
              stockNumber={product.stock.quantity || 0}
            />
          )}
          <div className="h-[2px] bg-gray-100" />
          {/* REVIEWS */}
          <div className="flex flex-col gap-8">
            <Suspense fallback={"Loding........"}>
              <Reviwes
                user={member?.member}
                product={product}
                productId={product?._id}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
