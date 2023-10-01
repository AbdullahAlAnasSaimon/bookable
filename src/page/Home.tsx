import Loader from "@/components/Loader";
import ProductsCard from "@/components/ProductsCard";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery(undefined);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-11/12 mx-auto my-10">
      <div className="grid grid-cols-4 gap-5">
        {data?.slice(0, 4)?.map((products: IProduct) => (
          <ProductsCard key={products?._id} product={products} />
        ))}
      </div>
    </section>
  );
};

export default Home;
