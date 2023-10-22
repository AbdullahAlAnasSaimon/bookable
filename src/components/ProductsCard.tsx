import { Card } from "./ui/card";
import { IProduct } from "@/types/globalTypes";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAddWishlistMutation } from "@/redux/features/api/apiSlice";
import { toast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { useAppSelector } from "@/redux/hooks";

const ProductsCard = ({ product }: { product: IProduct }) => {
  const { _id, title, photo, genre, price, author } = product;
  const {
    user: { user },
    product: { wishlist, currentlyReading },
  } = useAppSelector((state) => state);
  const [addWishlist, { error }] = useAddWishlistMutation();

  const handleAddWishlist = async () => {
    if (!user?.email) {
      toast({
        title: "Error",
        description: "Please Login to Wishlist",
        action: (
          <Link to="/login">
            <ToastAction altText="Goto schedule to undo">Log In</ToastAction>
          </Link>
        ),
      });
      return;
    }
    const data = {
      email: user?.email,
      productId: _id,
    };
    const result = await addWishlist(data);

    if ("data" in result) {
      if (result?.data?.acknowledged) {
        toast({
          title: "Success",
          description: "Book Wishlisted",
        });
      } else {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }
    }
  };

  return (
    <>
      <Card>
        <Link to={`/book/${_id}`}>
          <img
            className="w-11/12 mx-auto h-[250px] mt-3 rounded-md"
            src={photo}
            alt={title}
          />
        </Link>
        <div className="p-3">
          <Link to={`/book/${_id}`}>
            <h2 className="my-2 text-md font-semibold hover:underline">
              {title.length > 20 ? title.slice(0, 23) + "..." : title}
            </h2>
          </Link>
          <p className="text-sm">Author: {author}</p>
          <p className="my-1 text-sm">{genre}</p>
          <p className="mb-2 text-lg text-slate-900 font-bold">${price}</p>
          <Button
            onClick={handleAddWishlist}
            className="w-full"
            variant="default"
            disabled={
              wishlist?.find(
                (item: { productId: string | undefined }) =>
                  item?.productId === _id
              ) ||
              currentlyReading?.find(
                (item: { finishedReading: boolean }) =>
                  item?.finishedReading === true
              )
            }
          >
            {currentlyReading?.find(
              (item: { finishedReading: boolean }) =>
                item?.finishedReading === true
            )
              ? "Finished Reading"
              : "Add to Wishlist"}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ProductsCard;
