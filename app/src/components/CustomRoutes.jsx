import { Container, Loader } from "@mantine/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { setToken } from "../store/authReducer";

const CustomRoutes = ({ allowedRoles, user }) => {
  const { loading, token } = useSelector(state => state.auth);
  const location = useLocation();
  const { getUser } = useAuth();
  const navigate = useNavigate();
  console.log("User: ", user, location);

  useEffect(() => {
    if (token)
      getUser();
  }, [token]);

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }
  if (loading)
    return (
      <Container
        fluid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          margin: "0",
        }}
      >
        <Loader color="violet" size="xl" variant="oval" />
      </Container>
    );
  // if (!user) return <Navigate to="/login" />;
  if (!allowedRoles) return <Outlet />;
  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default CustomRoutes;
