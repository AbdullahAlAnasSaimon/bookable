// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProductQuery } from "@/redux/features/product/productSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

function SearchBar() {
  const [searchData, setSearchData] = useState("");
  const { register, handleSubmit } = useForm<{ searchData: string }>();
  console.log(searchData);

  const { data } = useSearchProductQuery(searchData);

  const handleFormSearchBar = (data: { searchData: string }) => {
    console.log(data);
    setSearchData(data.searchData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSearchBar)}
        className="flex w-full max-w-sm items-center my-2 "
      >
        <Input
          type="text"
          className="w-[400px] mr-2"
          placeholder="Search books by title, author, or genre"
          value={searchData}
          {...register("searchData", { required: true })}
        />
        <Button variant="secondary" type="submit">
          <Search className="" />
        </Button>
      </form>
      {/* <Button type="submit">Search</Button> */}
    </div>
  );
}

export default SearchBar;
