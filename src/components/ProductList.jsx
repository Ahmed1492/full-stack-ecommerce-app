import { wixClientServer } from "@/lib/wixClientServer";
import { unstable_cache } from "next/cache";
import AddToCart from "@/components/AddToCart";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

// Cache product queries for 5 minutes — keyed by all query params
const getCachedProducts = unstable_cache(
  async ({ categoryId, limit, name, type, min, max, sortBy, page }) => {
    const wixClient = await wixClientServer();
    const productPerPage = 8;

    let query = wixClient.products
      .queryProducts()
      .startsWith("name", name || "")
      .eq("collectionIds", categoryId)
      .hasSome("productType", type ? [type] : ["physical", "digital"])
      .gt("priceData.price", min || 0)
      .lt("priceData.price", max || 999999)
      .limit(limit || productPerPage)
      .skip(page ? parseInt(page) * (limit || productPerPage) : 0);

    if (sortBy) {
      const [dir, field] = sortBy.split(" ");
      query = dir === "asc" ? query.ascending(field) : query.descending(field);
    }

    const res = await query.find();
    return {
      items: res.items,
      currentPage: res.currentPage,
      hasPrev: res.hasPrev(),
      hasNext: res.hasNext(),
    };
  },
  ["products"],
  { revalidate: 300 } // 5 min cache
);

export default async function ProductList({ categoryId, limit, searchParams, type }) {
  let res;
  try {
    res = await getCachedProducts({
      categoryId,
      limit,
      name: searchParams?.name,
      type: searchParams?.Type,
      min: searchParams?.min,
      max: searchParams?.max,
      sortBy: searchParams?.SortBy,
      page: searchParams?.page,
    });
  } catch (error) {
    console.log(error);
  }

  if (!res?.items?.length) {
    return (
      <div className="flex flex-col items-center gap-4 py-20 text-gray-400">
        <Image src="/product.png" alt="" width={64} height={64} className="opacity-20" />
        <p className="text-lg font-medium">No products found</p>
        <p className="text-sm">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {res.items.map((item) => (
          <div
            key={item._id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition overflow-hidden"
          >
            <Link href={`/product/${item.slug}`} prefetch={false}>
              <div className="relative h-64 bg-gray-50 overflow-hidden">
                <Image
                  src={item?.media?.mainMedia?.image?.url || "/product.png"}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0 absolute z-10"
                />
                {item?.media?.items?.[1]?.image?.url && (
                  <Image
                    src={item.media.items[1].image.url}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover absolute"
                  />
                )}
                {item.discount?.value > 0 && (
                  <span className="absolute top-3 left-3 z-20 bg-[#D02E64] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    -{item.discount.value}%
                  </span>
                )}
              </div>
              <div className="px-4 pt-3 pb-1">
                <p className="font-semibold text-gray-800 text-sm truncate group-hover:text-[#D02E64] transition">
                  {item.name}
                </p>
                {item.additionalInfoSections && (
                  <div
                    className="text-gray-400 text-xs mt-1 line-clamp-1"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        item.additionalInfoSections.find((s) => s?.title === "shortDesc")?.description || ""
                      ),
                    }}
                  />
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-bold text-gray-900">${+item.price?.price}</span>
                  {item.price?.discountedPrice && item.price.discountedPrice < item.price.price && (
                    <span className="text-gray-400 line-through text-xs">${+item.price.discountedPrice}</span>
                  )}
                </div>
              </div>
            </Link>
            <div className="px-4 pb-4 pt-2">
              <AddToCart
                stockNumber={item?.stock?.quantity}
                variantId={item.variants[0]._id}
                productId={item?._id}
              />
            </div>
          </div>
        ))}
      </div>

      {type === "list" && (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev}
          hasNext={res.hasNext}
        />
      )}
    </div>
  );
}
