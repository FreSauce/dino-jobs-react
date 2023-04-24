import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";

const CodeEditor = ({ initComment, editorHandler, lang }) => {
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
      language={editorHandler.lang}
      theme="vs-dark"
      defaultValue={initComment}
      value={editorHandler.value}
      onChange={value => editorHandler.change(value)}
    />
  );
};

export default CodeEditor;
