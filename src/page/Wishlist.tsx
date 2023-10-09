import { useEffect } from "react";
import { useGetWishlistQuery } from "@/redux/features/api/apiSlice";
import { setWishlist } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Loader from "@/components/Loader";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetWishlistQuery(user?.email, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();

  // Move the dispatch inside a useEffect to avoid unnecessary dispatches
  useEffect(() => {
    if (data !== null) {
      dispatch(setWishlist(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Wishlist</h1>
      {/* Render your wishlist content here */}
    </div>
  );
};

export default Wishlist;
