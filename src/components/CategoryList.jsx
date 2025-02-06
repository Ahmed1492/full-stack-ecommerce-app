import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryList() {
  const wixClient = await wixClientServer();
  let cats = await wixClient.collections?.queryCollections().find();
  // console.log("cat>>>", cats);
  cats.items[0].media.mainMedia.image.url = process.env.PRODUCT_CAT;
  return (
    <div className="p-4 flex items-center gap-3 overflow-x-scroll scrollbar-hidden">
      {cats?.items?.map((item, index) => {
        // console.log(item?.media?.mainMedia?.image?.url);

        return (
          <Link
            key={index}
            href={`/list?cat=${item.slug}`}
            className="w-[20rem] flex-shrink-0 flex-col  h-max"
          >
            {/* IMAGE */}
            <div className="w-full relative h-80 mb-4">
              {item?.media?.mainMedia?.image?.url && (
                <Image
                  src={item?.media?.mainMedia?.image?.url || "/cat.png"}
                  alt=""
                  className="cursor-pointer  object-cover rounded-md "
                  fill
                  sizes="100%"
                />
              )}
            </div>
            <span className="font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
