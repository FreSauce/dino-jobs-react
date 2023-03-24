import {
  Container,
  Grid,
  Box,
  TextInput,
  PasswordInput,
  Button,
  Text,
  Checkbox,
  MediaQuery,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import validator from "validator";
import useAuth from "../hooks/useAuth";

const Login = ({ recruiter }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: {
      email: (value) => (validator.isEmail(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 5
          ? null
          : "Password must be at least 8 characters long",
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await login({
      email: values.email,
      password: values.password,
      role: recruiter ? "manager" : 'user',
    });
    if (res) {
      showNotification({
        title: "Success",
        message: "You have been logged in successfully",
        color: "teal",
        autoClose: 2000,
        // icon: <CheckIcon />,
      });
      navigate(location.state?.from || "/");
    } else {
      showNotification({
        title: "Error",
        message: "Invalid Credentials",
        color: "red",
        autoClose: false,
      });
    }
    setLoading(false);
    // console.log(user);
  };

  // if (user) {
  //   console.log(location.state?.from | "/");
  //   return <Navigate to={location.state?.from || "/"} replace />;
  // }

  return (
    <div
      style={{ height: "100vh", backgroundColor: "black" }}
      className="pattern-bg"
    >
      {/* <div className='pattern-bg'></div> */}
      <Grid sx={{ height: "100vh", width: "100%" }} m={0}>
        <Grid.Col>
          <Container
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MediaQuery query="(max-width: 600px)" styles={{ width: "100%" }}>
              <Box
                sx={{
                  width: "70%",
                  backgroundColor: "#181818",
                  opacity: 0.9,
                  borderRadius: "15px",
                  color: "white",
                }}
                p={30}
                pt={15}
              >
                <Text
                  sx={{
                    fontWeight: "700",
                    fontSize: "2.5rem",
                    textAlign: "center",
                  }}
                  mb={20}
                >
                  DinoJobs for {recruiter ? "Recruiters" : "Candidates"}
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Text mb={5} sx={{ fontWeight: "600", fontSize: "1.25rem" }}>
                    Hello! Let's get started
                  </Text>
                  <Text mb={15} sx={{ fontWeight: "500", fontSize: "1.1rem" }}>
                    Sign in to continue
                  </Text>
                  <TextInput
                    mb={13}
                    withAsterisk
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    mb={13}
                    withAsterisk
                    label="Password"
                    placeholder="********"
                    {...form.getInputProps("password")}
                  />
                  <Checkbox
                    mt={10}
                    {...form.getInputProps("remember", { type: "checkbox" })}
                    label="Keep me signed in"
                  />
                  <Button fullWidth type="submit" mt={20} loading={loading}>
                    <Text my={20} sx={{ fontWeight: "600", fontSize: "1rem" }}>
                      Login
                    </Text>
                  </Button>
                </form>
                <Text mt={10} sx={{ fontWeight: "600", fontSize: "0.9rem" }}>
                  Don't have an account?{" "}
                  <Link
                    mt={10}
                    style={{ textDecoration: "none" }}
                    to={"/register"}
                  >
                    <Text variant="link" sx={{ display: "inline" }}>
                      Sign up
                    </Text>
                  </Link>
                </Text>
              </Box>
            </MediaQuery>
          </Container>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Login;
