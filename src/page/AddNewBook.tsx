import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddNewBook = () => {
  return (
    <div>
      <h1>Add A New Book</h1>
      <section className="w-6/12 mx-auto">
        <form>
          <Input type="text" placeholder="Title" />
          <Input type="text" placeholder="Genre" />
          <Input type="text" placeholder="Price" />
          <Input type="text" placeholder="Publication Date" />
          <Textarea placeholder="Book Description" />
          <Button variant="default">Add</Button>
        </form>
      </section>
    </div>
  );
};

export default AddNewBook;
