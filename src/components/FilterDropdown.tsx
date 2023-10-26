"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useFilterProductQuery } from "@/redux/features/api/apiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setProducts } from "@/redux/features/product/productSlice";

export function FilterDropdown() {
  const [filter, setFilter] = useState({});
  const { register, handleSubmit } = useForm<{
    genre: string;
    publication_date: string;
  }>();
  const dispatch = useAppDispatch();

  const { data: filteredData, isLoading } = useFilterProductQuery(filter);

  const handleFilter = (data: { genre: string; publication_date: string }) => {
    const publication_date: string = new Date(data.publication_date)
      .toString()
      .slice(0, 15);
    const newData = { genre: data.genre, publication_date };
    setFilter(newData);
  };

  if (filteredData?.length > 0 && !isLoading) {
    dispatch(setProducts(filteredData));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          <SlidersHorizontal className="w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form onSubmit={handleSubmit(handleFilter)}>
          <Input
            type="text"
            placeholder="By Genre"
            className="mb-2"
            {...register("genre", { required: true })}
          />
          <Input
            type="date"
            placeholder="By Publication Date"
            className="mb-2"
            {...register("publication_date")}
          />
          <Button variant="default" className="w-full">
            {isLoading ? <Loader2 className="animation-spin" /> : "Filter"}
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdown;
