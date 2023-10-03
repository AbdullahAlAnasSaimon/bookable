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

  const dateObject = new Date(product?.publication_date);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return (
    <div className="my-10 bg-gray-100/50 w-11/12 mx-auto p-5 rounded-md">
      <div className="grid grid-cols-4 gap-10">
        <div className="w-full h-auto">
          <img src={product?.photo} alt="" className="h-[380px]" />
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-sm my-2">
            <i>
              Publishing Date: {day}-{month}-{year}
            </i>
          </p>
          <p className="font-semibold mb-1">Description</p>
          <p>{product?.description}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xl text-slate-900 font-semibold">
              $ {product?.price}
            </p>
            <p className="text-sm px-2 mt-2 rounded-full bg-slate-200 inline-block italic">
              {product?.genre}
            </p>
            <p>Author: {product?.author}</p>
          </div>
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
