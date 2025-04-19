import React from "react";
import CodeFileName from "./CodeFileName";
function EditorHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-700">
      <div className="flex space-x-2">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div className="text-sm font-medium ">
        <CodeFileName />
      </div>

      <div className="w-[60px]" />
    </div>
  );
}

export default EditorHeader;
