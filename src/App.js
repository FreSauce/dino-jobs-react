import './App.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <div className="App">
        <Routes>
          <Route path="/" element={<InterviewPanel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </MantineProvider>
  );
}

export default App;
