"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setEditorWidth, setMode } from "@/lib/features/code/codeEditorSlice";
import { setCodeLanguage } from "@/lib/features/code/codeEditorSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  FileCode,
  Braces,
  Globe,
  Code2,
  Terminal,
  Database,
  FlaskConical,
  FileJson,
  FileText,
  Sheet,
  FunctionSquare,
  Shell,
  Sigma,
  Settings,
  Tags,
  BadgeHelp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Slider } from "../ui/slider";

export const allCodingLanguage = [
  // Web Languages
  {
    id: 1,
    label: (
      <>
        <Globe className="mr-2 h-4 w-4" /> JavaScript
      </>
    ),
    value: "javascript",
    extension: "js",
  },
  {
    id: 2,
    label: (
      <>
        <Code2 className="mr-2 h-4 w-4" /> TypeScript
      </>
    ),
    value: "typescript",
    extension: "ts",
  },
  {
    id: 3,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> HTML
      </>
    ),
    value: "html",
    extension: "html",
  },
  {
    id: 4,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> CSS
      </>
    ),
    value: "css",
    extension: "css",
  },

  // Backend Languages
  {
    id: 5,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Python
      </>
    ),
    value: "python",
    extension: "py",
  },
  {
    id: 6,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Java
      </>
    ),
    value: "java",
    extension: "java",
  },
  {
    id: 7,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> PHP
      </>
    ),
    value: "php",
    extension: "php",
  },
  {
    id: 8,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Ruby
      </>
    ),
    value: "ruby",
    extension: "rb",
  },
  {
    id: 9,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> C#
      </>
    ),
    value: "csharp",
    extension: "cs",
  },
  {
    id: 10,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Go
      </>
    ),
    value: "go",
    extension: "go",
  },

  // Low-level / Compiled
  {
    id: 11,
    label: (
      <>
        <FunctionSquare className="mr-2 h-4 w-4" /> C
      </>
    ),
    value: "c",
    extension: "c",
  },
  {
    id: 12,
    label: (
      <>
        <FunctionSquare className="mr-2 h-4 w-4" /> C++
      </>
    ),
    value: "cpp",
    extension: "cpp",
  },
  {
    id: 13,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Rust
      </>
    ),
    value: "rust",
    extension: "rs",
  },
  {
    id: 14,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Zig
      </>
    ),
    value: "zig",
    extension: "zig",
  },

  // Data & Scripting
  {
    id: 15,
    label: (
      <>
        <Sigma className="mr-2 h-4 w-4" /> R
      </>
    ),
    value: "r",
    extension: "r",
  },
  {
    id: 16,
    label: (
      <>
        <Database className="mr-2 h-4 w-4" /> SQL
      </>
    ),
    value: "sql",
    extension: "sql",
  },
  {
    id: 17,
    label: (
      <>
        <Shell className="mr-2 h-4 w-4" /> Shell / Bash
      </>
    ),
    value: "shell",
    extension: "sh",
  },
  {
    id: 18,
    label: (
      <>
        <Terminal className="mr-2 h-4 w-4" /> PowerShell
      </>
    ),
    value: "powershell",
    extension: "ps1",
  },
  {
    id: 19,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Perl
      </>
    ),
    value: "perl",
    extension: "pl",
  },

  // Other / Markup
  {
    id: 20,
    label: (
      <>
        <FileJson className="mr-2 h-4 w-4" /> JSON
      </>
    ),
    value: "json",
    extension: "json",
  },
  {
    id: 21,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> YAML
      </>
    ),
    value: "yaml",
    extension: "yaml",
  },
  {
    id: 22,
    label: (
      <>
        <FileText className="mr-2 h-4 w-4" /> Markdown
      </>
    ),
    value: "markdown",
    extension: "md",
  },
  {
    id: 23,
    label: (
      <>
        <Sheet className="mr-2 h-4 w-4" /> XML
      </>
    ),
    value: "xml",
    extension: "xml",
  },
  {
    id: 24,
    label: (
      <>
        <BadgeHelp className="mr-2 h-4 w-4" /> LaTeX
      </>
    ),
    value: "latex",
    extension: "tex",
  },
];

export default function CodeTools() {
  const { codeLanguage, mode, editorWidth } = useSelector(
    (state) => state.codeEditor
  );
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <div className=" flex flex-row md:flex-col gap-3 items-center justify-center  ">
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[140px] justify-between  "
              >
                {codeLanguage
                  ? allCodingLanguage.find(
                      (codingLanguage) => codingLanguage.value === codeLanguage
                    )?.label
                  : "Select language..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[140px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search Language..."
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No Language found.</CommandEmpty>
                  <CommandGroup>
                    {allCodingLanguage.map((codinglanguage) => (
                      <CommandItem
                        key={codinglanguage.value}
                        value={codinglanguage.value}
                        onSelect={(currentValue) => {
                          dispatch(setCodeLanguage(currentValue));
                          setOpen(false);
                        }}
                      >
                        {codinglanguage.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            codeLanguage === codinglanguage.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex self-center items-center  flex-col md:flex-row gap-2   ">
          Dark Mode
          <Switch
            checked={mode === "dark"}
            onCheckedChange={() =>
              mode === "dark"
                ? dispatch(setMode("light"))
                : dispatch(setMode("dark"))
            }
          />
        </div>
        <div className="w-full px-3 text-center max-w-sm flex-col md:flex-row rounded-xl  md:border-1 md:p-4">
          <Slider
            max={896}
            min={320}
            step={1}
            value={[editorWidth]}
            onValueChange={(value) => dispatch(setEditorWidth(value[0]))}
          />
          <span className="mt-2">{editorWidth}px</span>
        </div>
      </div>
    </>
  );
}
