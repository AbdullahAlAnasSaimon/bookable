import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/globalTypes";
// import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const {
    register,
    // handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<IProduct>();

  const navigate = useNavigate();
  const { data } = useGetProductsQuery(undefined);
  const { user } = useAppSelector((state) => state.user);
  const { id: productId } = useParams();

  const product = data?.find((item: IProduct) => {
    if (item._id === productId) {
      return item;
    }
  });

  if (user?.email !== product?.seller_email) {
    navigate("/all-books");
  }

  /*  const handleFormSubmit = async (data: IProduct) => {
    data.publication_date = new Date(data.publication_date).toString();
    const result = await addProduct({
      ...data,
      author: user?.email && user?.email.split("@")[0],
      seller_email: user?.email,
      reviews: [],
    });
    if ("data" in result) {
      if (result?.data?.acknowledged) {
        toast({
          title: "Success",
          description: "Book added Successfully",
        });
        reset();
      } else if (!result?.data?.acknowledged) {
        toast({
          title: "Error",
          description: `${error}`,
        });
      }

      console.log(result);
      console.log(data);
    }
  }; */

  const dateInput = formatDate();

  function padTo2Digits(num: number) {
    return num.toString().padStart(2, "0");
  }

  function formatDate() {
    const dateObject = new Date(product?.publication_date);
    return [
      dateObject.getFullYear(),
      padTo2Digits(dateObject.getMonth() + 1),
      padTo2Digits(dateObject.getDate()),
    ].join("-");
  }

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">
        Edit <span className="font-bold">{product?.title}</span> Book
      </h1>
      <section className="w-6/12 mx-auto mt-5">
        <form>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="text"
                placeholder="Title"
                className="mb-2 w-full"
                value={product?.title}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-[12px] font-semibold text-red-500 mb-2">
                  *{errors.title.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Genre"
                className="mb-2 w-full"
                value={product?.genre}
                {...register("genre", { required: "Genre is required" })}
              />
              {errors.genre && (
                <p className="text-[12px] font-semibold text-red-500 mb-2">
                  *{errors.genre.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Image URL"
              className="mb-2"
              value={product?.photo}
              {...register("photo", { required: "Image URL is required" })}
            />
            {errors.photo && (
              <p className="text-[12px] font-semibold text-red-500 mb-2">
                *{errors.photo.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="number"
                placeholder="Price"
                className="mb-2"
                value={product?.price}
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && (
                <p className="text-[12px] font-semibold text-red-500 mb-2">
                  *{errors.price.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="date"
                placeholder="Publication Date"
                className="mb-2"
                value={dateInput}
                {...register("publication_date", {
                  required: "Publication Date is required",
                })}
              />
              {errors.publication_date && (
                <p className="text-[12px] font-semibold text-red-500 mb-2">
                  *{errors.publication_date.message}
                </p>
              )}
            </div>
          </div>
          <Textarea
            placeholder="Book Description"
            className="mb-2"
            value={product?.description}
            {...register("description", {
              required: "Book Description is required",
            })}
          />
          {errors.description && (
            <p className="text-[12px] font-semibold text-red-500 mb-2">
              *{errors.description.message}
            </p>
          )}
          <Button
            type="submit"
            variant="default"
            className="w-full"
            // disabled={isLoading}
          >
            Edit
          </Button>
        </form>
      </section>
    </div>
  );
};

export default EditBook;
