import { Button } from "@/components/ui/button";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
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
import { Input } from "@/components/ui/input";

const BookDetails = () => {
  const { user } = useAppSelector((state) => state.user);
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
    <div className="my-10  w-11/12 mx-auto">
      <div className="grid grid-cols-4 gap-10 bg-gray-100/50 p-5 rounded-md">
        <div className="w-full h-auto">
          <img src={product?.photo} alt="" className="h-[380px]" />
        </div>
        <div className="col-span-2">
          <h1 className="text-3xl font-semibold">{product?.title}</h1>
          <p className="text-sm my-2">
            <span>Author: {product?.author}</span>
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
      {user?.email && (
        <section className="flex gap-5 mt-5 w-10/12 mx-auto">
          <Input placeholder="Add your valuable reviews" />
          <Button className="w-[15%]">Add Review</Button>
        </section>
      )}
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
    </div>
  );
};

export default BookDetails;
