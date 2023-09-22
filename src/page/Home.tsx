import ProductsCard from "@/components/ProductsCard";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <section className="w-11/12 mx-auto">
      <div className="grid grid-cols-4 gap-5">
        {data?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default Home;
