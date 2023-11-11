// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProductQuery } from "@/redux/features/api/apiSlice";
import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { setProducts } from "@/redux/features/product/productSlice";
import { useAppDispatch } from "@/redux/hooks";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [removeSkip, setRemoveSkip] = useState(true);
  const { register, handleSubmit } = useForm<{
    searchData: string;
  }>();

  const onSubmit = (data: { searchData: string }) => {
    try {
      setRemoveSkip(false);
      setSearch(data.searchData);
    } catch (err) {
      console.log(err);
      setRemoveSkip(true);
    }
  };

  const { data, isLoading } = useSearchProductQuery(search, {
    skip: removeSkip,
  });

  if (data) {
    setRemoveSkip(true);
    dispatch(setProducts(data.data));
  }

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
        <Button variant="secondary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Search className="" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
