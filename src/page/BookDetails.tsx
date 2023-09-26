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
    <div>
      <div>
        <img src={product?.photo} alt="" />
      </div>
      <div>
        <h1>{product?.name}</h1>
        <p>{product?.genre}</p>
        <p>{product?.seller_name}</p>
      </div>
    </div>
  );
};

export default BookDetails;
