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
} from "@/lib/features/code/codeEditorSlice";
import { toast } from "sonner";
import EditorHeader from "./EditorHeader";
export default function CodeEditor() {
  const dispatch = useDispatch();
  const { codeLanguage, mode, codeFileName, code, editorWidth } = useSelector(
    (state) => state.codeEditor
  );
  const editorRef = useRef(null);
  const editorContentRef = useRef(null);
  const dataToSave = {
    code: code,
    codeLanguage: codeLanguage,
    mode: mode,
    codeFileName: codeFileName,
    editorWidth: editorWidth,
  };
  const [isEditorReady, setIsEditorReady] = useState(false);
  const handleEditorMount = (editor) => {
    editorRef.current = editor;

    const updateHeight = () => {
      var height = editor.getContentHeight();
      var width = editor.getContentWidth();
      if (width < 320) {
        width = 320;
      }
      if (width > 896) {
        width = 896;
      }
      if (height < 320) {
        height = 320;
      }
      dispatch(setEditorWidth(width));
      editor.layout({ height, width });
    };
    editor.onDidContentSizeChange(updateHeight);
    updateHeight();
    setIsEditorReady(true);
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
  const handleExport = async (formatOfImage) => {
    if (!isEditorReady || editorContentRef.current === null) {
      toast.warn("Editor is not ready yet. Please wait.");
      return;
    }
    try {
      const dataUrl =
        formatOfImage === "png"
          ? await toPng(editorContentRef.current)
          : await toJpeg(editorContentRef.current);

      const link = document.createElement("a");
      link.download = `${codeFileName}.${formatOfImage}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log(error);
      toast.error("something went Wrong try after sometime");
    }
  };
  return (
    <div className="flex flex-col items-center gap-4  min-w-sm h-full min-h-auto ">
      <Navbar handleExport={handleExport} isEditorReady={isEditorReady} />
      <div className="flex flex-col   md:flex-row gap-4">
        <div
          ref={editorContentRef}
          style={{ width: `${editorWidth}px` }}
          className={`max-w-4xl min-w-xs border-2  ${
            mode === "vs-dark" ? "dark" : "light"
          } `}
        >
          <div className="p-4 bg-amber-200 ">
            <div className="rounded-xl  overflow-hidden shadow-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-[#1e1e1e]">
              <EditorHeader />

              <Editor
                defaultValue={code || "ooo"}
                value={code || "giiii"}
                language={codeLanguage}
                onChange={(value) => dispatch(setCode(value))}
                theme={`vs-${mode}`}
                onMount={handleEditorMount}
                options={{
                  // fontSize: 16,
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
        </div>

        <CodeTools />
      </div>
    </div>
  );
}
