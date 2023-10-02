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

  return (
    <div>
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
      <section>
        {product?.reviews?.length >= 1 ? (
          product?.reviews.map(
            (review: {
              author: string;
              user_email: string;
              review: string;
            }) => <p>{review?.review}</p>
          )
        ) : (
          <p>No Reviews Found</p>
        )}
      </section>
    </div>
  );
};

export default BookDetails;
