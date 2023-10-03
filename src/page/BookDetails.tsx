import { Button } from "@/components/ui/button";
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
    <div className="my-10 bg-gray-100 w-11/12 mx-auto p-4 rounded-md">
      <div className="grid grid-cols-4 gap-5">
        <div className="w-full h-auto">
          <img src={product?.photo} alt="" className="h-[380px]" />
        </div>
        <div className="col-span-2">
          <h1>{product?.title}</h1>
          <p>{product?.genre}</p>
          <p>{product?.seller_name}</p>
          <p>{product?.price}</p>
          <p>{product?.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button>Edit</Button>
          <Button variant="destructive">Delete</Button>
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
