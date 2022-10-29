import { Container, Loader } from "@mantine/core";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//none, user, manager
const CustomRoutes = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log("User: ", user, loading);
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
  if (!allowedRoles) return <Outlet />;
  return allowedRoles == user?.role ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default CustomRoutes;
