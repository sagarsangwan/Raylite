"use client";
import CodeFileName from "./CodeFileName";
import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { toJpeg, toPng } from "html-to-image";
import CodeTools from "./CodeTools";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
export default function CodeEditor() {
  const [code, setCode] = useState(`def my_function():
  print("Hello from a function")`);
  const { codeLanguage, mode } = useSelector((state) => state.codeEditor);
  const editorRef = useRef(null);
  // console.log(mode);
  const handleExport = async (formatOfImage) => {
    console.log(formatOfImage);
    if (editorRef.current === null) return;
    try {
      if (formatOfImage === "png") {
        const dataUrl = await toPng(editorRef.current);
        const link = document.createElement("a");
        link.download = "code-image.png";
        link.href = dataUrl;
        link.click();
      }
      if (formatOfImage === "jpeg") {
        const dataUrl = await toJpeg(editorRef.current);
        const link = document.createElement("a");
        link.download = "code-image.png";
        link.href = dataUrl;
        link.click();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-5">
      <Navbar handleExport={handleExport} />
      {/* Editor container */}
      <div
        ref={editorRef}
        style={{ resize: "horizontal", overflow: "auto" }}
        className={`min-w-sm  max-w-4xl h-90vh  ${
          mode === "vs-dark" ? "dark" : "light"
        }`}
      >
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#1e1e1e]">
          <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800 border-b dark:border-zinc-700">
            <div className="flex space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>

            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              <CodeFileName codeLanguage={codeLanguage} />
            </div>

            <div className="w-[60px]" />
          </div>

          {/* Code editor */}
          <Editor
            height="440px"
            value={code}
            language={codeLanguage}
            onChange={(value) => setCode(value || "")}
            theme={mode}
            // onMount={(editor) => {
            //   editorRef.current = editor;
            //   const updateHeight = () => {
            //     const height = editor.getContentHeight();
            //     console.log(height);
            //     editor.layout({ height });
            //   };
            //   editor.onDidContentSizeChange(updateHeight);
            //   updateHeight();
            // }}
            options={{
              fontSize: 16,
              lineNumbers: "off",
              glyphMargin: false,
              folding: false,
              lineNumbersMinChars: 0,
              overviewRulerLanes: 0,
              hideCursorInOverviewRuler: true,
              scrollBeyondLastLine: false,
              minimap: { enabled: false },
              padding: { top: 20, bottom: 20 },
              renderLineHighlight: "none",
              scrollbar: {
                vertical: "hidden",
                horizontal: "auto",
              },
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* Export / Tools */}
      <CodeTools />
    </div>
  );
}
