import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link href="/">
        <h1 className="font-bold text-4xl">
          Dev<span className="text-orange-700">Drews</span>
        </h1>
      </Link>

      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="/images/profile.png" alt="Andrews" />
              <AvatarFallback className="text-black">DD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-white bg-slate-900">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/auth">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
