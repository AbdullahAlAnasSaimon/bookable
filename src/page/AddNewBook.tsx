import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

const AddNewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-center text-xl font-semibold">Add A New Book</h1>
      <section className="w-6/12 mx-auto mt-5">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Title"
              className="mb-2"
              {...register("title", { required: "Title is required" })}
            />
            <Input
              type="text"
              placeholder="Genre"
              className="mb-2"
              {...register("genre", { required: "Genre is required" })}
            />
          </div>
          <Input
            type="text"
            placeholder="Image URL"
            className="mb-2"
            {...register("imageUrl", { required: "Image URL is required" })}
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Price"
              className="mb-2"
              {...register("price", { required: "Price is required" })}
            />
            <Input
              type="date"
              placeholder="Publication Date"
              className="mb-2"
              {...register("publication_date", {
                required: "Publication Date is required",
              })}
            />
          </div>
          <Textarea
            placeholder="Book Description"
            className="mb-2"
            {...register("description", {
              required: "Book Description is required",
            })}
          />
          <Button type="submit" variant="default" className="w-full">
            Add
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddNewBook;
