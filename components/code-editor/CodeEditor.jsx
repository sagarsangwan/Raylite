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
  setMode,
  toggleMode,
} from "@/lib/features/code/codeEditorSlice";
export default function CodeEditor() {
  // const code = useSelector((state) => state.codeEditor.code);
  const dispatch = useDispatch();
  const [editorWidth, setEditorWidth] = useState(320);
  const { codeLanguage, mode, codeFileName, code } = useSelector(
    (state) => state.codeEditor
  );
  const dataToSave = {
    code: code,
    codeLanguage: codeLanguage,
    mode: mode,
    codeFileName: codeFileName,
  };
  const editorRef = useRef(null);
  // console.log(mode);
  const handleExport = async (formatOfImage) => {
    console.log(formatOfImage);
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
      console.log(error);
    }
  };
  useEffect(() => {
    const dataFromHash = readFromHash();

    if (dataFromHash) {
      dispatch(setCode(dataFromHash.code));
      dispatch(setCodeLanguage(dataFromHash.codeLanguage));
      dispatch(setCodeFileName(dataFromHash.codeFileName));
      dispatch(setMode(dataFromHash.mode));
    }
  }, []);
  useEffect(() => {
    try {
      saveToHash(dataToSave);
    } catch (err) {
      console.log(err);
    }
  }, [codeLanguage, code, mode, codeFileName]);

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

              automaticLayout: true,
            }}
          />
        </div>
      </div>

      {/* Export / Tools */}
      <CodeTools editorWidth={editorWidth} setEditorWidth={setEditorWidth} />
    </div>
  );
}
