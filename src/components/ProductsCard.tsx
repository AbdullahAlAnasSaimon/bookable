import React from "react";
import { Card } from "./ui/card";
import { IProduct } from "@/types/globalTypes";

const ProductsCard = ({ product }: { product: IProduct }) => {
  const { name, photo, genre, price, seller_name } = product;

  return (
    <>
      <Card>
        <img className="w-11/12 mx-auto h-[320px]" src={photo} alt={name} />
        <div className="p-3">
          <h2 className="my-2 text-lg font-semibold">{name}</h2>
          <p className="text-sm">Author: {seller_name}</p>
          <p className="mb-2 text-sm">{genre}</p>
          <p className="mb-2 text-lg text-slate-900 font-bold">${price}</p>
        </div>
      </Card>
    </>
  );
};

export default ProductsCard;
