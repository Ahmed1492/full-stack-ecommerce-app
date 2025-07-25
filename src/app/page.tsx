import HomeSlider from "@/components/HomeSlider";
import ProductList from "@/components/ProductList";
import SkeletonLoader from "@/components/SkeletonLoader";
import SkeletonCategory from "@/components/SkeletonCategory";
import CategoryList from "@/components/CategoryList";
import { MyWixClientContext } from "@/context/wixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { Suspense } from "react";
const HomePage = async () => {
  return (
    <div className="overflow-hidden">
      {/* HOME PAGE SLIDER */}
      <HomeSlider />
      {/* PRODUCT LISTS */}
      <div className="px-[10%]">
        <h1 className="text-2xl mt-20 mb-7 font-medium ">Featured Products</h1>
        <Suspense fallback={<SkeletonLoader />}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      {/* CATEGORY LIST */}
      <h1 className="text-2xl mt-20 px-[10%] mb-7 font-medium ">Categories</h1>

      <Suspense fallback={<SkeletonCategory />}>
        <CategoryList />
      </Suspense>
      {/* NEW PRODUCT LIST */}
      <div className="px-[10%]">
        <h1 className="text-2xl mt-20 mb-7 font-medium ">New Products</h1>
        <Suspense fallback={<SkeletonLoader />}>
          <ProductList categoryId={process.env.FEATURED_PRODUCT_CATEGORY_ID!} />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
