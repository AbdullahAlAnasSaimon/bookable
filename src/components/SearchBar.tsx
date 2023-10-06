// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchProductQuery } from "@/redux/features/product/productSlice";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

function SearchBar() {
  const [searchData, setSearchData] = useState("");
  console.log(searchData);

  const { data } = useSearchProductQuery(searchData);
  console.log(data);

  return (
    <div>
      <form className="flex w-full max-w-sm items-center my-2 ">
        <Input
          type="text"
          className="w-[400px] mr-2"
          placeholder="Search books by title, author, or genre"
          value={searchData}
        />
        <Button variant="secondary">
          <Search className="" />
        </Button>
      </form>
      {/* <Button type="submit">Search</Button> */}
    </div>
  );
}

export default SearchBar;
