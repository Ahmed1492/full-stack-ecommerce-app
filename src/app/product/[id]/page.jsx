import React, { Suspense } from "react";
import ProductImage from "@/components/ProductImage";
import CustomizeProduct from "@/components/CustomizeProduct";
import AddProduct from "@/components/AddProduct";
import Reviwes from "@/components/Reviwes";
import RelatedProducts from "@/components/RelatedProducts";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { members } from "@wix/members";
import Link from "next/link";
import Image from "next/image";

export default async function SingleProduct({ params }) {
  const wixClient = await wixClientServer();
  let product;

  try {
    const products = await wixClient.products
      .queryProducts()
      .eq("slug", params.id)
      .find();
    if (!products?.items[0]) return notFound();
    product = products.items[0];
  } catch {
    return notFound();
  }

  const isLoggedIn = wixClient.auth.loggedIn();
  let member;
  if (isLoggedIn) {
    member = await wixClient.members.getCurrentMember({
      fieldsets: [members.Set.FULL],
    });
  }

  const hasDiscount =
    product.price?.discountedPrice &&
    product.price.discountedPrice < product.price.price;

  const discountPct = hasDiscount
    ? Math.round(
        ((product.price.price - product.price.discountedPrice) /
          product.price.price) *
          100
      )
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="px-[10%] pt-6 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#D02E64] transition">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#D02E64] transition">Shop</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <div className="px-[10%] mt-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10 flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* Images */}
          <div className="w-full lg:w-[45%] lg:sticky top-24 h-max">
            <ProductImage items={product.media.items} />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Title + badges */}
            <div className="flex flex-col gap-2">
              {hasDiscount && (
                <span className="w-max bg-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                  -{discountPct}% OFF
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-sm text-gray-400">by <span className="font-medium text-gray-600">{product.brand}</span></p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end gap-3">
              {hasDiscount ? (
                <>
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${product.price.discountedPrice}
                  </span>
                  <span className="text-xl text-gray-400 line-through mb-0.5">
                    ${product.price.price}
                  </span>
                  <span className="text-sm text-green-600 font-semibold mb-1">
                    Save ${(product.price.price - product.price.discountedPrice).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-extrabold text-gray-900">
                  ${product.price.price}
                </span>
              )}
            </div>

            <div className="h-px bg-gray-100" />

            {/* Description */}
            {product.description && (
              <div
                className="text-gray-500 text-sm leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            <div className="h-px bg-gray-100" />

            {/* Variants / Add to cart */}
            {product.variants && product.productOptions ? (
              <CustomizeProduct
                productId={product._id}
                variants={product.variants}
                productOptions={product.productOptions}
                stockNumber={product.stock?.quantity || 0}
              />
            ) : (
              <AddProduct
                productId={product._id}
                variantId={product.variants?.[0]?._id || "00000000-0000-0000-0000-000000000000"}
                stockNumber={product.stock?.quantity || 0}
              />
            )}

            <div className="h-px bg-gray-100" />

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🚚", title: "Free Shipping", sub: "On orders over $50" },
                { icon: "↩️", title: "Free Returns", sub: "Within 30 days" },
                { icon: "🔒", title: "Secure Payment", sub: "100% protected" },
              ].map((b) => (
                <div key={b.title} className="flex flex-col items-center text-center gap-1 bg-gray-50 rounded-2xl p-3">
                  <span className="text-xl">{b.icon}</span>
                  <p className="text-xs font-semibold text-gray-700">{b.title}</p>
                  <p className="text-[10px] text-gray-400">{b.sub}</p>
                </div>
              ))}
            </div>

            {/* Payment icons */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-gray-400">We accept:</span>
              {["/visa.png", "/mastercard.png", "/paypal.png"].map((src) => (
                <Image key={src} src={src} alt="" width={36} height={22} className="object-contain opacity-60" />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10">
          <Suspense fallback={<ReviewsSkeleton />}>
            <Reviwes
              user={member?.member}
              product={product}
              productId={product._id}
            />
          </Suspense>
        </div>

        {/* Related products */}
        <Suspense fallback={<RelatedSkeleton />}>
          <RelatedProducts
            categoryId={product.collectionIds?.[0]}
            currentProductId={product._id}
          />
        </Suspense>
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="h-5 bg-gray-100 rounded w-32" />
      {[...Array(2)].map((_, i) => (
        <div key={i} className="flex gap-4 py-4 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-3 bg-gray-100 rounded w-1/4" />
            <div className="h-3 bg-gray-100 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function RelatedSkeleton() {
  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10 animate-pulse">
      <div className="h-5 bg-gray-100 rounded w-40 mb-7" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-gray-50">
            <div className="h-52 bg-gray-100" />
            <div className="p-3 flex flex-col gap-2">
              <div className="h-3 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/3" />
              <div className="h-8 bg-gray-100 rounded-xl mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
