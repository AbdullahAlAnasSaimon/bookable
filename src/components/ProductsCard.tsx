import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { IProduct } from "@/types/globalTypes";

const ProductsCard = ({ product }: { product: IProduct }) => {
  const { name, genre, price, seller_name } = product;

  return (
    <>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardContent>
          <p>{genre}</p>
          <p>{price}</p>
        </CardContent>
        <CardFooter>
          <p>{seller_name}</p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductsCard;
