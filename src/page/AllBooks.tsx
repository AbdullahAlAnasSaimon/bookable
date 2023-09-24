import Loader from "@/components/Loader";
import ProductsCard from "@/components/ProductsCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";

const AllBooks = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(error);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-11/12 mx-auto my-10">
      <Button>Add New</Button>
      <SearchBar />
      <div className="grid grid-cols-4 gap-5">
        {data?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default AllBooks;
