"use client";
import CodeFileName from "./CodeFileName";
import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import CodeTools from "./CodeTools";
import { useSelector } from "react-redux";
export default function CodeEditor() {
  const [code, setCode] = useState(`function helloWorld() {
  console.log("Hello, world!");
}`);
  const { codeLanguage, mode } = useSelector((state) => state.codeEditor);
  const editorRef = useRef(null);
  // console.log(mode);
  const handleExport = async () => {
    if (editorRef.current === null) return;

    try {
      const dataUrl = await toPng(editorRef.current);
      const link = document.createElement("a");
      link.download = "code-image.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-5">
      {/* Editor container */}
      <div
        ref={editorRef}
        className={`w-full max-w-4xl h-[500px] ${
          mode === "vs-dark" ? "dark" : "light"
        }`}
      >
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#1e1e1e]">
          {/* Mac-style title bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-700">
            {/* Left side with three buttons */}
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            {/* Filename in center */}
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              <CodeFileName codeLanguage={codeLanguage} />
            </div>

            {/* Spacer to align filename in center */}
            <div className="w-[60px]" />
          </div>

          {/* Code editor */}
          <Editor
            height="440px"
            value={code}
            language={codeLanguage}
            onChange={(value) => setCode(value || "")}
            theme={mode}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              lineNumbers: "on",
              padding: { top: 20 },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* Export / Tools */}
      <CodeTools handleExport={handleExport} />
    </div>
  );
}
