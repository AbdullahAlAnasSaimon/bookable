import ProductsCard from "@/components/ProductsCard";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";

const Home = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);
  console.log(data);
  console.log(isLoading);
  console.log(error);

  // interface IProduct {
  //   name: string;
  //   genre: string;
  //   photo: string;
  //   seller_name: string;
  //   seller_email: string;
  //   price: number;
  //   description: string;
  //   reviews: string[];
  // }

  return (
    <div>
      <h1>Home</h1>
      {data?.map((products: IProduct) => (
        <ProductsCard key={products?._id} products={products} />
      ))}
    </div>
  );
};

export default Home;
