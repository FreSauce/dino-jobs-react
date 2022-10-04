import Editor, { useMonaco } from "@monaco-editor/react";
import { useRef } from "react";
import { useEffect } from "react";

const CodeEditor = ({ initComment }) => {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  return (
    <Editor
      height="calc(100vh - 48px)"
      defaultLanguage="cpp"
      language="cpp"
      theme="vs-dark"
      defaultValue={initComment}
    />
  );
};

export default CodeEditor;
