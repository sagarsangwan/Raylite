"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Navbar({ handleExport }) {
  const copyToClipboard = async () => {
    const currentLink = `https://raylite.vercel.app/${window.location.hash}`;
    console.log(currentLink);
    return await navigator.clipboard.writeText(currentLink);
  };
  return (
    <nav className="w-full px-6 py-3 border-b bg-white dark:bg-zinc-900 dark:border-zinc-700 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <div className="text-xl font-semibold text-zinc-900 dark:text-white">
        CodeSnap
      </div>

      {/* Export Button with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            Export
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleExport("png")}>
            Export as PNG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExport("jpeg")}>
            Export as JPEG
          </DropdownMenuItem>
          <DropdownMenuItem onClick={copyToClipboard}>
            Copy Link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
