import HomeSlider from "@/components/HomeSlider";
import ProductList from "@/components/ProductList";
import CategoryList from "@/components/CategoryList";
const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* HOME PAGE SLIDER */}
      <HomeSlider />
      {/* PRODUCT LISTS */}
      <div className="px-[10%]">
        <h1 className="text-2xl mt-20 mb-7 font-medium ">Featured Products</h1>
        <ProductList />
      </div>
      {/* CATEGORY LIST */}
      <h1 className="text-2xl mt-20 px-[10%] mb-7 font-medium ">Categories</h1>
      <CategoryList />
      {/* NEW PRODUCT LIST */}
      <div className="px-[10%]">
        <h1 className="text-2xl mt-20 mb-7 font-medium ">New Products</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default HomePage;
