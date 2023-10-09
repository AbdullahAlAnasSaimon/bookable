import { useGetWishlistQuery } from "@/redux/features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const Wishlist = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetWishlistQuery(user?.email, {
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();
  if (data !== null) {
    dispatch(data);
  }
  console.log(data);
  return (
    <div>
      <h1>Wishlist</h1>
    </div>
  );
};

export default Wishlist;
