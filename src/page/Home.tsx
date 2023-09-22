import ProductsCard from "@/components/ProductsCard";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <div>
      <h1>Home</h1>
      <ProductsCard />
    </div>
  );
};

export default Home;
