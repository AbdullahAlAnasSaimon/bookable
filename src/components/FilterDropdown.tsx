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

export function FilterDropdown() {
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
        <Input type="text" placeholder="By Genre" className="mb-2" />
        <Input type="date" placeholder="By Publication Date" className="mb-2" />
        <Button variant="default" className="w-full">
          Filter
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdown;
