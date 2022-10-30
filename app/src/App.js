import "./App.css";
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomRoutes from "./components/CustomRoutes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Jobs from "./pages/Jobs";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recruiter/login" element={<Login recruiter={true} />} />
        <Route
          path="/recruiter/register"
          element={<Register recruiter={true} />}
        />
        <Route path="/register" element={<Register />} />
        <Route element={<CustomRoutes allowedRoles={["user", "manager"]} />}>
          <Route path="/interview/:interviewId" element={<InterviewPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
