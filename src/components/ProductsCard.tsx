import { Card } from "./ui/card";
import { IProduct } from "@/types/globalTypes";
import { Link } from "react-router-dom";

const ProductsCard = ({ product }: { product: IProduct }) => {
  const { _id, title, photo, genre, price, author } = product;

  return (
    <>
      <Card>
        <Link to={`/book/${_id}`}>
          <img
            className="w-11/12 mx-auto h-[320px] mt-3 rounded-md"
            src={photo}
            alt={title}
          />
        </Link>
        <div className="p-3">
          <Link to={`/book/${_id}`}>
            <h2 className="my-2 text-lg font-semibold">{title}</h2>
          </Link>
          <p className="text-sm">Author: {author}</p>
          <p className="my-1 text-sm">{genre}</p>
          <p className="mb-2 text-lg text-slate-900 font-bold">${price}</p>
        </div>
      </Card>
    </>
  );
};

export default ProductsCard;
