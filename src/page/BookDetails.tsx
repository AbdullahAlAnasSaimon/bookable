import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { IProduct } from "@/types/globalTypes";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { data } = useGetProductsQuery(undefined);
  const productId = useParams();

  const product = data?.find((item: IProduct) => {
    if (item._id === productId.id) {
      return item;
    }
  });

  console.log(product);
  return (
    <div className="flex w-11/12 mx-auto">
      <div className="w-6/12">
        <img src={product?.photo} alt="" />
      </div>
      <div className="w-6/12">
        <h1>{product?.name}</h1>
        <p>{product?.genre}</p>
        <p>{product?.seller_name}</p>
        <p>{product?.price}</p>
        <p>{product?.description}</p>
      </div>
    </div>
  );
};

export default BookDetails;
