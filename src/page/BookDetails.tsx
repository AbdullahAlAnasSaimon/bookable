import { Button } from "@/components/ui/button";
import {
  useAddReviewMutation,
  useGetProductsQuery,
} from "@/redux/features/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/globalTypes";
import { Link, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loader from "@/components/Loader";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface IReview {
  review: string;
  seller_email: string;
  seller_name: string;
}
const BookDetails = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetProductsQuery(undefined);
  const [addReview, { isLoading: reviewLoading, error }] =
    useAddReviewMutation();
  const productId = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IReview>();

  if (isLoading) {
    return <Loader />;
  }

  const product = data?.find((item: IProduct) => {
    if (item._id === productId.id) {
      return item;
    }
  });

  const handleReviewSubmit = async (data: IReview) => {
    const result = await addReview({
      ...data,
      bookId: productId.id,
      user_email: user?.email,
      user_name: user?.email?.split("@")[0],
    });
    if ("data" in result) {
      if (result.data.acknowledged) {
        toast({
          title: "Success",
          description: "Review Added Successfully",
        });
      } else {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }
    }

    console.log(result);
  };

  const newDescription = product?.description.split(/\r?\\n/);

  const dateObject = new Date(product?.publication_date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  return (
    <div className="my-10  w-11/12 mx-auto">
      <div className="grid grid-cols-4 gap-10 bg-gray-100/50 p-5 rounded-md">
        <div className="w-full h-auto">
          <img src={product?.photo} alt="" className="h-[380px]" />
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-sm my-2">
            <span className="block">Author: {product?.author}</span>
            <i>
              Publishing Date: {day}-{month}-{year}
            </i>
          </p>
          <p className="font-semibold mb-1">Description</p>
          {newDescription?.map((item: string, index: number) => (
            <p className="my-2" key={index}>
              {item}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xl text-slate-900 font-semibold">
              $ {product?.price}
            </p>
            <p className="text-sm px-2 mt-2 rounded-full bg-slate-200 inline-block italic">
              Genre: {product?.genre}
            </p>
          </div>
          {user?.email === product?.seller_email && (
            <div className="flex flex-col gap-3">
              <Link to={`/edit-book/${product._id}`}>
                <Button className="w-full">Edit</Button>
              </Link>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete {product?.title}</DialogTitle>
                    <DialogDescription>
                      Are you sure? you want to delete {product?.title} book.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button type="submit" variant="destructive">
                      Confirm Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
          <Button>Add to Wishlist</Button>
        </div>
      </div>

      <section className="mt-5">
        {product?.reviews?.length >= 1 ? (
          product?.reviews.map(
            (review: {
              user_name: string;
              user_email: string;
              review: string;
            }) => (
              <div className="bg-gray-100/50 p-5 rounded-md">
                <p className="mb-2">{product?.reviews?.length} Review Found</p>
                <div className="bg-slate-300/50 inline-block p-2 rounded-lg">
                  <p className="text-sm font-semibold">{review?.user_name}</p>
                  <p>{review?.review}</p>
                </div>
              </div>
            )
          )
        ) : (
          <p className="text-center text-2xl font-bold my-10 text-slate-300">
            No Reviews Found
          </p>
        )}
      </section>

      {user?.email && (
        <section className="flex flex-col gap-5 mt-5 w-10/12 mx-auto">
          <form onSubmit={handleSubmit(handleReviewSubmit)}>
            <Textarea
              placeholder="Add your valuable reviews"
              {...register("review", {
                required: "You can't leave this empty",
              })}
            />
            {errors.review && (
              <p className="text-[12px] font-semibold text-red-500 mb-2">
                *{errors.review.message}
              </p>
            )}
            <Button
              className="w-full mt-5"
              type="submit"
              disabled={reviewLoading}
            >
              Add Review
            </Button>
          </form>
        </section>
      )}
    </div>
  );
};

export default BookDetails;
