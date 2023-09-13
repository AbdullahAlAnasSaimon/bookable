import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
