import './App.css';
import { MantineProvider } from '@mantine/core';
import InterviewPanel from './pages/InterviewPanel';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

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
