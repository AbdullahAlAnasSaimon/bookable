import Loader from "@/components/Loader";
import ProductsCard from "@/components/ProductsCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(error);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-11/12 mx-auto my-10">
      <div className="flex justify-center items-center gap-5">
        <Link to="/add-new-book">
          <Button variant="default">Add New</Button>
        </Link>
        <SearchBar />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {data?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default AllBooks;
