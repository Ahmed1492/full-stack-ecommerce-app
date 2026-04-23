import { wixClientServer } from "@/lib/wixClientServer";
import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";

const getCachedCategories = unstable_cache(
  async () => {
    const wixClient = await wixClientServer();
    const cats = await wixClient.collections.queryCollections().find();
    return cats.items.map((item, index) => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      imageUrl:
        index === 0
          ? process.env.PRODUCT_CAT || item?.media?.mainMedia?.image?.url || null
          : item?.media?.mainMedia?.image?.url || null,
    }));
  },
  ["categories"],
  { revalidate: 3600 } // 1 hour
);

export async function GET() {
  try {
    const items = await getCachedCategories();
    return NextResponse.json({ items }, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
