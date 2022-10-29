import "./App.css";
import { MantineProvider } from "@mantine/core";
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Jobs from './pages/Jobs';
import Home from "./pages/Home";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark", }}
    >
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/interview" element={<InterviewPanel />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/" element={<PrivateRoute />} />
          </Routes>
        </AuthContextProvider>
      </div>
    </MantineProvider>
  );
}

export default App;
