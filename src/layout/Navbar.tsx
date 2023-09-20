import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
// import { DropdownMenuSeparator } from "../components/ui/dropdown-menu";
// import { DropdownMenuLabel } from "../components/ui/dropdown-menu";
// import {
//   DropdownMenuItem,
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
// } from "../components/ui/dropdown-menu";
// import { signOut } from "firebase/auth";
// import { auth } from "@/lib/firebase";
// import { setUser } from "@/redux/features/user/userSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Navbar() {
  // const { user } = useAppSelector((state) => state.user);

  // const dispatch = useAppDispatch();

  return (
    <nav className="w-full h-12 fixed top backdrop-blur-lg z-10 bg-green-200">
      <div className="h-full w-11/12 mx-auto">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <h1>Bookable</h1>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">All Books</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/checkout">Checkout</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost"></Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
