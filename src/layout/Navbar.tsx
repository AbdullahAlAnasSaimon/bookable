import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser } from "@/redux/features/user/userSlice";
import {
  ChevronDown,
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  LogIn,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Loader from "@/components/Loader";

export default function Navbar() {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  if (!user?.email && isLoading) {
    return <Loader />;
  }

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
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                          {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                          {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                          {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem disabled>
                          <Users className="mr-2 h-4 w-4" />
                          <span>Team</span>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger disabled>
                            <UserPlus className="mr-2 h-4 w-4" />
                            <span>Invite users</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                <span>Email</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                <span>Message</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                <span>More...</span>
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem disabled>
                          <Plus className="mr-2 h-4 w-4" />
                          <span>New Team</span>
                          {/* <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut> */}
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled>
                        <Github className="mr-2 h-4 w-4" />
                        <span>GitHub</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        <span>Support</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        <Cloud className="mr-2 h-4 w-4" />
                        <span>API</span>
                      </DropdownMenuItem>
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
                  <li>
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-slate-900 text-slate-50 hover:bg-slate-900/90 rounded-md ml-4"
                    >
                      <LogIn className="w-4 h-4 mr-2 " />
                      <span>Log in</span>
                    </Link>
                  </li>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
