import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth);
    dispatch(setUser(null));
  };

  return (
    <nav className="w-full h-12 backdrop-blur-lg z-10 bg-white-60 drop-shadow-lg">
      <div className="h-full w-11/12 mx-auto">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <h1 className="text-lg font-medium">Bookable</h1>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/all-books">All Books</Link>
                </Button>
              </li>
              <li>
                {user.email ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="default">
                        {user?.email} {<ChevronDown className="ml-2 h-4 w-4" />}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-30 mt-2">
                      <DropdownMenuItem>
                        <Button onClick={handleLogout} variant="default">
                          <LogOut className="mr-2 h-4 w-4 inline-block" />
                          Log out
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="default" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
