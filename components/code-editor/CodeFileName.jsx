import { allCodingLanguage } from "./CodeTools";
import { useState } from "react";
import { Input } from "../ui/input";
import { useSelector, useDispatch } from "react-redux";
import { setCodeFileName } from "@/lib/features/code/codeEditorSlice";

function CodeFileName({ codeLanguage }) {
  const selectedCodingLanguage = allCodingLanguage.find(
    (language) => language.value === codeLanguage
  );
  const codeLanguageExtension = selectedCodingLanguage?.extension || "";

  const fileName = useSelector((state) => state.codeEditor.codeFileName);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    let inputValue = e.target.value;

    // remove extension if user types it manually
    if (codeLanguageExtension) {
      const regex = new RegExp(`(\\.${codeLanguageExtension})+$`);
      inputValue = inputValue.replace(regex, "");
    }

    dispatch(setCodeFileName(inputValue));
  };

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
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            className="pr-12 border-0 bg-transparent text-sm font-medium"
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
