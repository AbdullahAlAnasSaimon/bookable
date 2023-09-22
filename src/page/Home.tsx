import { useGetProductsQuery } from "@/redux/features/api/apiSlice";

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
