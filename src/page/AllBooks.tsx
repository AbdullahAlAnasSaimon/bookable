import FilterDropdown from "@/components/FilterDropdown";
import ProductsCard from "@/components/ProductsCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/globalTypes";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const {
    user,
    product: { products },
  } = useAppSelector((state) => state);

  return (
    <section className="w-11/12 mx-auto mt-5 mb-20">
      <div className="flex justify-center items-center gap-5 my-5">
        {user?.user?.email && (
          <Link to="/add-new-book">
            <Button variant="default">Add New</Button>
          </Link>
        )}
        <SearchBar />
        <FilterDropdown />
      </div>
      <p className="my-5 text-right text-sm">
        <span className="font-semibold">{products?.length}</span> item
        {products?.length > 1 && "'s"} available
      </p>
      {!products && <p className="text-center">Sorry, No books found!</p>}
      <div className="grid grid-cols-5 gap-4">
        {products?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default AllBooks;
