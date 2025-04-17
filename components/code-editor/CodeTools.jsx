import React, { useState } from "react";
import { Input } from "../ui/input";
import { setCodeLanguage } from "@/lib/features/code/codeSlice";
import { useSelector, useDispatch } from "react-redux";
export default function CodeTools({ handleExport }) {
  const codeLanguage = useSelector((state) => state.code.codeLanguage);
  const dispatch = useDispatch();
  return (
    <div>
      <Input
        value={codeLanguage}
        onChange={(e) => dispatch(setCodeLanguage(e.target.value))}
      />

      <button
        onClick={handleExport}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Export as PNG
      </button>
    </div>
  );
}
