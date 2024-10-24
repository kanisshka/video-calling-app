import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users, EllipsisVertical } from "lucide-react";
const MenuControl = () => {
  return (
    <div>
      {" "}
      <DropdownMenu>
        <div className="flex items-center">
          <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d px-4 py-2 hover:bg-[#4c535d]">
            <EllipsisVertical size={20} className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            <DropdownMenuItem className="px-4 py-2 hover:bg-[#4c535d]">
              Item 1
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 py-2 hover:bg-[#4c535d]">
              Item 2
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="px-4 py-2 hover:bg-[#4c535d]">
              Item 3
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default MenuControl;
