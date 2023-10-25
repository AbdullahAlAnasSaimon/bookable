// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProductQuery } from "@/redux/features/api/apiSlice";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Loader from "./Loader";
import { setProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const { register, handleSubmit } = useForm<{
    searchData: string;
  }>();

  const onSubmit = (data: { searchData: string }) => {
    console.log(data);
    setSearch(data.searchData);
  };

  const { data, isLoading } = useSearchProductQuery(search);
  if (isLoading) {
    return <Loader />;
  }
  if (data) {
    dispatch(setProducts(data.data));
  }
  console.log(data);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm items-center my-2 "
      >
        <Input
          type="text"
          className="w-[400px] mr-2"
          placeholder="Search books by title, author, or genre"
          {...register("searchData")}
        />
        <Button variant="secondary" type="submit">
          <Search className="" />
        </Button>
      </form>
      {/* <Button type="submit">Search</Button> */}
    </div>
  );
};

export default SearchBar;
