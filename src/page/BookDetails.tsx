import { useGetProductsQuery } from "@/redux/features/api/apiSlice";
import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { data } = useGetProductsQuery(undefined);
  const product = useParams();
  console.log(product);
  console.log(data);
  return <div></div>;
};

export default BookDetails;
