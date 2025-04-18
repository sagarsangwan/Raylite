"use client";

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
    <div className="flex flex-col items-center gap-4">
      {/* Editor container to capture */}
      <div
        ref={editorRef}
        className="w-full max-w-4xl h-[500px] rounded-xl overflow-hidden shadow-lg"
      >
        <Editor
          height="100%"
          //   defaultLanguage="javascript"
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
      <CodeTools handleExport={handleExport} />

      {/* Export button */}
    </div>
  );
}
