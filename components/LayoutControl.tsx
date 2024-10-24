import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutList,
  ChevronDown,
  Grid,
  PanelsLeftBottom,
  PanelsRightBottom,
} from "lucide-react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

interface LayoutControlProps {
  layout: CallLayoutType;
  setLayout: (layout: CallLayoutType) => void;
}

const LayoutControl: React.FC<LayoutControlProps> = ({ layout, setLayout }) => {
  const layoutOptions = [
    {
      value: "grid" as CallLayoutType,
      label: "Grid",
      icon: <Grid size={20} className="mr-2" />, // Use appropriate icon component
    },
    {
      value: "speaker-left" as CallLayoutType,
      label: "Speaker-Left",
      icon: <PanelsLeftBottom size={20} className="mr-2" />, // Use appropriate icon component
    },
    {
      value: "speaker-right" as CallLayoutType,
      label: "Speaker-Right",
      icon: <PanelsRightBottom  size={20} className="mr-2" />, // Use appropriate icon component
    },
  ];
  return (
    <DropdownMenu>
      <div className="flex items-center">
        <DropdownMenuTrigger className="cursor-pointer flex items-center rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535d]">
          <LayoutList size={20} className="text-white" />
          <span className="ml-2 text-white">{layout}</span>
          <ChevronDown size={16} className="ml-2 text-white" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
          {layoutOptions.map((item) => (
            <div key={item.value}>
              <DropdownMenuItem
                className="cursor-pointer flex items-center"
                onClick={() => setLayout(item.value)} // Set layout on click
              >
                {item.icon} {/* Render the icon */}
                {item.label} {/* Render the label */}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-dark-1" />
            </div>
          ))}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
};

export default LayoutControl;
