import "./App.css";
import { MantineProvider } from "@mantine/core";
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AuthContextProvider from "./context/AuthContext";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark" }}
    >
      <div className="App">
        <AuthContextProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/interview" element={<InterviewPanel />} />
            </Route>
          </Routes>
        </AuthContextProvider>
      </div>
    </MantineProvider>
  );
}

export default App;
