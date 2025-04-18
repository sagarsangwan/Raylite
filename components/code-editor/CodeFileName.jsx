import { allCodingLanguage } from "./CodeTools";
import { useState } from "react";
import { Input } from "../ui/input";

function CodeFileName({ codeLanguage }) {
  const selectedCodingLanguage = allCodingLanguage.find(
    (language) => language.value === codeLanguage
  );
  const codeLanguageExtension = selectedCodingLanguage?.extension || "";

  const [fileName, setFileName] = useState("untitled");
  const [isEditing, setIsEditing] = useState(false);

  //   const handleChange = (e) => {
  //     const value = e.target.value.replace(/\..*$/, "");
  //     setFileName(value);
  //   };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <div
      className="text-sm font-medium text-gray-800 dark:text-gray-200 cursor-text"
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <div className="relative w-48">
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="pr-10 border-0 bg-transparent text-sm font-medium"
          />
          {codeLanguageExtension && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              .{codeLanguageExtension}
            </span>
          )}
        </div>
      ) : (
        <span>
          {fileName +
            (codeLanguageExtension ? `.${codeLanguageExtension}` : "")}
        </span>
      )}
    </div>
  );
}

export default CodeFileName;
