import "./App.css";
import { useEffect, useState } from 'react'
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecRegister from "./pages/RecRegister";
import CustomRoutes from "./components/CustomRoutes";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SavedJobs from './pages/SavedJobs'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./store/authReducer";
import ApplyJobs from "./pages/ApplyJobs";
import { setAppliedJobs } from "./store/userReducer";
import ManJobs from "./pages/ManJobs";
import JobHandler from "./components/JobHandler";
import Interview from "./pages/Interview";
import InterviewHandler from "./components/InterviewHandler";

function App() {
  const { user, loading } = useSelector(state => state.auth)
  const { saved_jobs } = useSelector(state => state.user);
  const dispatch = useDispatch();


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(setToken(token));
  }, []);

  useEffect(() => {
    console.log(saved_jobs)
    localStorage.setItem('savedJobs', JSON.stringify(saved_jobs))
  }, [saved_jobs])

  useEffect(() => {
    if (user && user.applied_jobs) {
      dispatch(setAppliedJobs(user.applied_jobs))
    }
  }, [user])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recruiter/login" element={<Login recruiter={true} />} />
        <Route
          path="/recruiter/register"
          element={<RecRegister recruiter={true} />}
        />
        <Route path="/recruiter/jobs" element={<ManJobs />} />

        <Route path="/" element={<Home />} />
        <Route element={<CustomRoutes allowedRoles={["user", "manager"]} />}>
          <Route path="/interview/:interviewId" element={<InterviewPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/interview' element={<InterviewHandler />} />
          <Route path="/jobs" element={<JobHandler />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/applied-jobs" element={<ApplyJobs />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
