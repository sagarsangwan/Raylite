"use client";
import SmallIcon from "../public/images/SmallIcon.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function Navbar({ handleExport }) {
  const copyToClipboard = async () => {
    const currentLink = `https://raylite.vercel.app/${window.location.hash}`;

    await navigator.clipboard.writeText(currentLink);
    toast.success("copied to clipboard");
    return;
  };
  return (
    <nav className="w-full px-6 py-3 border-b bg-white dark:bg-zinc-900 dark:border-zinc-700 flex justify-between items-center shadow-sm">
      {/* Logo */}
      <Link href="/">
        <Image alt="icon" src={SmallIcon} width={32} height={32} />
      </Link>

      {/* Export Button with Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-xs"
          >
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
