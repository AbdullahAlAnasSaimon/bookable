"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

export function FilterDropdown() {
  const { register, handleSubmit } = useForm<{
    genre: string;
    publication_date: string;
  }>();

  const handleFilter = (data: { genre: string; publication_date: string }) => {
    const publication_date: string = new Date(data.publication_date).toString();
    const newData = { genre: data.genre, publication_date };
    console.log(newData);
  };

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
            {...register("genre")}
          />
          <Input
            type="date"
            placeholder="By Publication Date"
            className="mb-2"
            {...register("publication_date")}
          />
          <Button variant="default" className="w-full">
            Filter
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdown;
