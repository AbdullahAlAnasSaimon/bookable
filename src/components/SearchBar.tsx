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
    <div className="flex w-full max-w-sm items-center space-x-2 my-2 ">
      <Input
        onChange={(e) => setSearchData(e.target.value)}
        type="text"
        placeholder="Search books by title, author, or genre"
        value={searchData}
      />
      <Button variant="secondary">
        <Search className="" />
      </Button>
      {/* <Button type="submit">Search</Button> */}
    </div>
  );
}

export default SearchBar;
