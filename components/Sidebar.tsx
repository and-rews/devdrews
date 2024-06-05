import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Newspaper,
  Folders,
  CreditCard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Command className="bg-secondary rounded-none text-white">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="/dashboard">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/dashboard/posts">Posts</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h-4 w-4" />
            <Link href="/dashboard/categories">Categories</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h-4 w-4" />
            <Link href="/dashboard/projects">Projects</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};

export default Sidebar;