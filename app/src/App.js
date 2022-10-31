import "./App.css";
import { useState } from 'react'
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomRoutes from "./components/CustomRoutes";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import useAuth from "./hooks/useAuth";
import ManJobs from "./pages/ManJobs";
import Home from "./pages/Home";
import SavedJobs from './pages/SavedJobs'

function App() {
  const { user, loading } = useAuth();
  const [savedJobs, setSavedJobs] = useState([]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<Login recruiter={true} />} />
        <Route
          path="/recruiter/register"
          element={<Register recruiter={true} />}
        />
        <Route path="/" element={<Home />} />
        <Route element={<CustomRoutes allowedRoles={["user", "manager"]} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/saved-jobs" element={<SavedJobs savedJobs={savedJobs} setSavedJobs={setSavedJobs} />} />
          <Route path="/interview/:interviewId" element={<InterviewPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
