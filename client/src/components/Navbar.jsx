import { Menu, Zap } from "lucide-react";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <header className="h-16 fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#080808]/85 backdrop-blur-xl border-b border-black/[0.07] dark:border-white/[0.07]">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 hidden md:flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center">
            <Zap size={16} className="text-white dark:text-black" />
          </div>
          <span className="font-black text-xl text-black dark:text-white tracking-tight">
            Learnify
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full pl-3 pr-1 py-1 border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 bg-black/5 dark:bg-white/5 hover:bg-black/8 dark:hover:bg-white/8 transition-all">
                  <span className="text-sm text-black/60 dark:text-white/60 hidden lg:block">
                    {user.name}
                  </span>
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback className="bg-black/10 dark:bg-white/10 text-black dark:text-white text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-52 bg-white dark:bg-[#101010] border border-black/10 dark:border-white/10 text-black/80 dark:text-white/80"
                align="end"
              >
                <DropdownMenuLabel className="text-black/30 dark:text-white/30 text-xs uppercase tracking-wider">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer">
                    <Link to="my-learning" className="w-full">
                      My Learning
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer">
                    <Link to="profile" className="w-full">
                      Edit Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => logoutUser()}
                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 focus:bg-red-50 dark:focus:bg-red-500/10 cursor-pointer"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="bg-black/10 dark:bg-white/10" />
                    <DropdownMenuItem className="hover:bg-black/5 dark:hover:bg-white/5 focus:bg-black/5 dark:focus:bg-white/5 cursor-pointer text-black/60 dark:text-white/60">
                      <Link to="/admin/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/login")}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 h-9 rounded-xl"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="btn-glow h-9 px-5 text-sm rounded-xl"
              >
                Get Started
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-black dark:bg-white flex items-center justify-center">
            <Zap size={13} className="text-white dark:text-black" />
          </div>
          <span className="font-black text-lg text-black dark:text-white">
            Learnify
          </span>
        </Link>
        <MobileNavbar user={user} logoutHandler={() => logoutUser()} />
      </div>
    </header>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 rounded-xl"
        >
          <Menu size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-white dark:bg-[#101010] border-l border-black/10 dark:border-white/10">
        <SheetHeader className="flex flex-row items-center justify-between mt-2 mb-6">
          <SheetTitle className="font-black text-xl text-black dark:text-white tracking-tight">
            Learnify
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <div className="w-full h-px bg-black/10 dark:bg-white/10 mb-6" />
        <nav className="flex flex-col gap-2">
          <Link
            to="/my-learning"
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors hover-link"
          >
            My Learning
          </Link>
          <Link
            to="/profile"
            className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors hover-link"
          >
            Edit Profile
          </Link>
          {user ? (
            <button
              onClick={logoutHandler}
              className="text-left text-red-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            >
              Log out
            </button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="btn-glow rounded-xl"
            >
              Login
            </Button>
          )}
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button
                className="w-full btn-glow rounded-xl"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
