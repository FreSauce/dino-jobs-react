import "./App.css";
import InterviewPanel from "./pages/InterviewPanel";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomRoutes from "./components/CustomRoutes";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route element={<CustomRoutes />}> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* </Route> */}
        <Route element={<CustomRoutes allowedRoles={"user"} />}>
          <Route path="/interview" element={<InterviewPanel />} />
        </Route>
      </Routes>
    </div>
  );
}

const Home = () => {
  return <h1>Home</h1>;
};

export default App;
