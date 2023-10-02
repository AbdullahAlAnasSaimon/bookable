import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useAddProductMutation } from "@/redux/features/api/apiSlice";
import { useAppSelector } from "@/redux/hooks";
import { IProduct } from "@/types/globalTypes";
import { useForm } from "react-hook-form";

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>();

  const { user } = useAppSelector((state) => state.user);
  const [addProduct, { isError, isSuccess, error }] = useAddProductMutation();

  const handleFormSubmit = async (data: IProduct) => {
    data.publication_date = new Date(data.publication_date).toString();
    const result = await addProduct({
      ...data,
      author: user?.email && user?.email.split("@")[0],
      reviews: [],
    });
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Book added Successfully",
      });
    } else if (isError) {
      toast({
        title: "Error",
        description: `${error}`,
      });
    }
    console.log(result);
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add A New Book</h1>
      <section className="w-6/12 mx-auto mt-5">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Input
                type="text"
                placeholder="Title"
                className="mb-2 w-full"
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
            {...register("description", {
              required: "Book Description is required",
            })}
          />
          {errors.description && (
            <p className="text-[12px] font-semibold text-red-500 mb-2">
              *{errors.description.message}
            </p>
          )}
          <Button type="submit" variant="default" className="w-full">
            Add
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddNewBook;
