import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "@/components/AddToCart";
import DOMPurify from "isomorphic-dompurify";

export default async function RelatedProducts({ categoryId, currentProductId }) {
  const wixClient = await wixClientServer();
  let items = [];

  try {
    const res = await wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId)
      .ne("_id", currentProductId)
      .limit(4)
      .find();
    items = res.items;
  } catch (e) {
    console.log(e);
  }

  if (!items.length) return null;

  return (
    <div className="mt-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-10">
      <div className="flex items-end justify-between mb-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#D02E64] mb-1">
            You may also like
          </p>
          <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
        </div>
        <Link
          href="/shop"
          className="text-sm text-[#D02E64] hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {items.map((item) => {
          const hasDiscount =
            item.price?.discountedPrice &&
            item.price.discountedPrice < item.price.price;

          return (
            <div
              key={item._id}
              className="group bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition overflow-hidden"
            >
              <Link href={`/product/${item.slug}`}>
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <Image
                    src={item?.media?.mainMedia?.image?.url || "/product.png"}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-[#D02E64] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      SALE
                    </span>
                  )}
                </div>

                <div className="px-3 pt-3 pb-1">
                  <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-[#D02E64] transition">
                    {item.name}
                  </p>
                  {item.additionalInfoSections && (
                    <div
                      className="text-gray-400 text-xs mt-0.5 line-clamp-1"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          item.additionalInfoSections.find(
                            (s) => s?.title === "shortDesc"
                          )?.description || ""
                        ),
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-bold text-gray-900 text-sm">
                      ${hasDiscount ? item.price.discountedPrice : item.price?.price}
                    </span>
                    {hasDiscount && (
                      <span className="text-gray-400 line-through text-xs">
                        ${item.price.price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              <div className="px-3 pb-3 pt-1">
                <AddToCart
                  stockNumber={item?.stock?.quantity}
                  variantId={item.variants?.[0]?._id}
                  productId={item._id}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
