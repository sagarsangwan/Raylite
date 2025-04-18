import React, { useState } from "react";
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
import { toggleMode } from "@/lib/features/code/codeEditorSlice";
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

const allCodingLanguage = [
  // Web Languages
  {
    id: 1,
    label: (
      <>
        <Globe className="mr-2 h-4 w-4" /> JavaScript
      </>
    ),
    value: "javascript",
  },
  {
    id: 2,
    label: (
      <>
        <Code2 className="mr-2 h-4 w-4" /> TypeScript
      </>
    ),
    value: "typescript",
  },
  {
    id: 3,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> HTML
      </>
    ),
    value: "html",
  },
  {
    id: 4,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> CSS
      </>
    ),
    value: "css",
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
  },
  {
    id: 6,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Java
      </>
    ),
    value: "java",
  },
  {
    id: 7,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> PHP
      </>
    ),
    value: "php",
  },
  {
    id: 8,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Ruby
      </>
    ),
    value: "ruby",
  },
  {
    id: 9,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> C#
      </>
    ),
    value: "csharp",
  },
  {
    id: 10,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Go
      </>
    ),
    value: "go",
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
  },
  {
    id: 12,
    label: (
      <>
        <FunctionSquare className="mr-2 h-4 w-4" /> C++
      </>
    ),
    value: "cpp",
  },
  {
    id: 13,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Rust
      </>
    ),
    value: "rust",
  },
  {
    id: 14,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Zig
      </>
    ),
    value: "zig",
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
  },
  {
    id: 16,
    label: (
      <>
        <Database className="mr-2 h-4 w-4" /> SQL
      </>
    ),
    value: "sql",
  },
  {
    id: 17,
    label: (
      <>
        <Shell className="mr-2 h-4 w-4" /> Shell / Bash
      </>
    ),
    value: "shell",
  },
  {
    id: 18,
    label: (
      <>
        <Terminal className="mr-2 h-4 w-4" /> PowerShell
      </>
    ),
    value: "powershell",
  },
  {
    id: 19,
    label: (
      <>
        <Braces className="mr-2 h-4 w-4" /> Perl
      </>
    ),
    value: "perl",
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
  },
  {
    id: 21,
    label: (
      <>
        <FileCode className="mr-2 h-4 w-4" /> YAML
      </>
    ),
    value: "yaml",
  },
  {
    id: 22,
    label: (
      <>
        <FileText className="mr-2 h-4 w-4" /> Markdown
      </>
    ),
    value: "markdown",
  },
  {
    id: 23,
    label: (
      <>
        <Sheet className="mr-2 h-4 w-4" /> XML
      </>
    ),
    value: "xml",
  },
  {
    id: 24,
    label: (
      <>
        <BadgeHelp className="mr-2 h-4 w-4" /> LaTeX
      </>
    ),
    value: "latex",
  },
];

export default function CodeTools({ handleExport }) {
  const { codeLanguage, mode } = useSelector((state) => state.codeEditor);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  return (
    <div>
      {/* <Select>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">
              New Zealand Standard Time (NZST)
            </SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {codeLanguage
              ? allCodingLanguage.find(
                  (codingLanguage) => codingLanguage.value === codeLanguage
                )?.label
              : "Select language..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Language..." className="h-9" />
            <CommandList>
              <CommandEmpty>No Language found.</CommandEmpty>
              <CommandGroup>
                {allCodingLanguage.map((codinglanguage) => (
                  <CommandItem
                    key={codinglanguage.value}
                    value={codinglanguage.value}
                    onSelect={(currentValue) => {
                      // setValue(currentValue === value ? "" : currentValue);
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
      <Switch
        checked={mode === "vs-dark"}
        onCheckedChange={() => dispatch(toggleMode())}
      />

      <button
        onClick={handleExport}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Export as PNG
      </button>
    </div>
  );
}
