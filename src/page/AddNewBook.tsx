import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddNewBook = () => {
  return (
    <div>
      <h1>Add A New Book</h1>
      <section className="w-6/12 mx-auto mt-5">
        <form>
          <Input type="text" placeholder="Title" className="mb-2" />
          <Input type="text" placeholder="Genre" className="mb-2" />
          <Input type="text" placeholder="Price" className="mb-2" />
          <Input type="text" placeholder="Publication Date" className="mb-2" />
          <Textarea placeholder="Book Description" className="mb-2" />
          <Button variant="default" className="w-full">
            Add
          </Button>
        </form>
      </section>
    </div>
  );
};

export default AddNewBook;
