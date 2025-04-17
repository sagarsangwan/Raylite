"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef } from "react";
import { toPng } from "html-to-image";

export default function CodeEditor() {
  const [code, setCode] = useState(`function helloWorld() {
  console.log("Hello, world!");
}`);
  const editorRef = useRef(null);

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
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
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

      {/* Export button */}
      <button
        onClick={handleExport}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Export as PNG
      </button>
    </div>
  );
}
