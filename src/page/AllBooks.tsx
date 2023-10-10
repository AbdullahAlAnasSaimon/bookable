import FilterDropdown from "@/components/FilterDropdown";
import Loader from "@/components/Loader";
import ProductsCard from "@/components/ProductsCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { setProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/globalTypes";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, error } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();

  if (data !== null) {
    dispatch(setProducts(data));
  }

  console.log(error);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-11/12 mx-auto mt-5 mb-20">
      <div className="flex justify-center items-center gap-5 my-5">
        {user?.email && (
          <Link to="/add-new-book">
            <Button variant="default">Add New</Button>
          </Link>
        )}
        <SearchBar />
        <FilterDropdown />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default AllBooks;
