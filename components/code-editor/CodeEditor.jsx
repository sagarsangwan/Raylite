"use client";
import CodeFileName from "./CodeFileName";
import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import { toJpeg, toPng } from "html-to-image";
import CodeTools from "./CodeTools";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar";
import { readFromHash, saveToHash } from "@/lib/hashUtils";
import {
  setCode,
  setCodeFileName,
  setCodeLanguage,
  setEditorWidth,
  setMode,
  toggleMode,
} from "@/lib/features/code/codeEditorSlice";
import { toast } from "sonner";
import EditorHeader from "./EditorHeader";
export default function CodeEditor() {
  // const code = useSelector((state) => state.codeEditor.code);
  const dispatch = useDispatch();
  const { codeLanguage, mode, codeFileName, code, editorWidth } = useSelector(
    (state) => state.codeEditor
  );
  const dataToSave = {
    code: code,
    codeLanguage: codeLanguage,
    mode: mode,
    codeFileName: codeFileName,
    editorWidth: editorWidth,
  };
  const editorRef = useRef(null);

  const handleExport = async (formatOfImage) => {
    if (editorRef.current === null) return;
    try {
      const dataUrl =
        formatOfImage === "png"
          ? await toPng(editorRef.current)
          : await toJpeg(editorRef.current);
      const link = document.createElement("a");
      link.download = `${codeFileName}.${formatOfImage}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      toast.error("something went Wrong try after sometime");
    }
  };
  useEffect(() => {
    const dataFromHash = readFromHash();

    if (dataFromHash) {
      dispatch(setCode(dataFromHash.code));
      dispatch(setCodeLanguage(dataFromHash.codeLanguage));
      dispatch(setCodeFileName(dataFromHash.codeFileName));
      dispatch(setMode(dataFromHash.mode));
      dispatch(setEditorWidth(dataFromHash.editorWidth));
    }
  }, []);
  useEffect(() => {
    try {
      saveToHash(dataToSave);
    } catch (err) {
      toast.error("something went Wrong try after sometime");
    }
  }, [codeLanguage, code, mode, codeFileName, editorWidth]);

  return (
    <div className="flex flex-col items-center gap-4  min-w-sm h-full min-h-auto ">
      <Navbar handleExport={handleExport} />
      {/* Editor container */}
      <div
        ref={editorRef}
        style={{ width: `${editorWidth}px` }}
        className={`max-w-4xl min-w-xs  ${
          mode === "vs-dark" ? "dark" : "light"
        } `}
      >
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#1e1e1e]">
          <EditorHeader />
          <Editor
            // value={code}
            defaultValue={code}
            language={codeLanguage}
            onChange={(value) => dispatch(setCode(value))}
            theme={`vs-${mode}`}
            // onMount={(editor) => {
            //   editorRef.current = editor;
            //   const updateHeight = () => {
            //     var height = editor.getContentHeight();
            //     console.log(height);
            //     // if (height < 200) {
            //     //   height = 220;
            //     // }
            //     console.log("heightt", height);
            //     editor.layout({ height });
            //   };
            //   editor.onDidContentSizeChange(updateHeight);
            //   updateHeight();
            // }}
            height="440px"
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
                horizontal: "hidden",
              },
              formatOnPaste: "true",
              // format
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
