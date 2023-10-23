import { useEffect } from "react";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import MainLayout from "./layout/MainLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { setLoading, setUser } from "./redux/features/user/userSlice";
import {
  useGetCurrentlyReadingQuery,
  useGetProductsQuery,
  useGetWishlistQuery,
} from "./redux/features/api/apiSlice";
import {
  setCurrentlyReadingBook,
  setProducts,
  setWishlist,
} from "./redux/features/product/productSlice";
import Loader from "./components/Loader";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });
  }, [dispatch]);
  const { user } = useAppSelector((state) => state.user);

  const { data, isLoading } = useGetProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: wishlistData } = useGetWishlistQuery(user?.email, {
    refetchOnMountOrArgChange: true,
  });
  const { data: currentlyReadingData } = useGetCurrentlyReadingQuery(
    user?.email,
    { refetchOnMountOrArgChange: true }
  );

  if (data !== null || wishlistData !== null || currentlyReadingData !== null) {
    dispatch(setProducts(data));
    if (user?.email) {
      dispatch(setWishlist(wishlistData));
      dispatch(setCurrentlyReadingBook(currentlyReadingData));
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Toaster />
        <MainLayout />
      </div>
    </>
  );
}

export default App;
