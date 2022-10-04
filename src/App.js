import "./App.css";
import { MantineProvider } from "@mantine/core";
import CodeEditor from "./components/CodeEditor";
import InterviewPanel from "./pages/InterviewPanel";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <div className="App">
        <InterviewPanel />
      </div>
    </MantineProvider>
  );
}

export default App;
