import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";
import {
  BookOpen,
  ChevronDown,
  Heart,
  LogIn,
  LogOut,
  Mail,
} from "lucide-react";

// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
              {user?.email && (
                <li>
                  <Button variant="link" asChild>
                    <Link to="/add-new-book">Add New Book</Link>
                  </Button>
                </li>
              )}
              <li>
                {user.email ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost">
                        My Account
                        <ChevronDown className="w-4 h-4 ml-1 mt-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>
                        {" "}
                        <Mail className="inline-block w-4 h-4 mr-2" />{" "}
                        {user?.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link to="/wishlist" className="cursor-pointer">
                          <DropdownMenuItem>
                            <Heart className="mr-2 h-4 w-4" />
                            <span>Wishlist</span>
                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                          </DropdownMenuItem>
                        </Link>
                        <Link to="/currently-reading">
                          <DropdownMenuItem>
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>Currently Reading</span>
                            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-slate-900 text-slate-50 hover:bg-slate-900/90 rounded-md ml-4"
                  >
                    <LogIn className="w-4 h-4 mr-2 " />
                    <span>Log in</span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
