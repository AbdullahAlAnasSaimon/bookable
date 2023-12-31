import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../page/Login";
import Home from "@/page/Home";
import Signup from "@/page/Signup";
import AllBooks from "@/page/AllBooks";
import AddNewBook from "@/page/AddNewBook";
import BookDetails from "@/page/BookDetails";
import PrivateRoute from "./PrivateRoute";
import EditBook from "@/page/EditBook";
import Wishlist from "@/page/Wishlist";
import CurrentlyReading from "@/page/CurrentlyReading";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/add-new-book",
        element: (
          <PrivateRoute>
            <AddNewBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/currently-reading",
        element: (
          <PrivateRoute>
            <CurrentlyReading />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
