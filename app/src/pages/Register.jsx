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
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import validator from "validator";
import useAuth from "../hooks/useAuth";
import { showNotification } from "@mantine/notifications";

const Register = ({ recruiter }) => {
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      company: '',
      toc: false,
    },
    validate: {
      fullname: (value) => (value !== '' ? null : 'Full Name is required'),
      email: (value) => (validator.isEmail(value) ? null : "Invalid Email"),
      password: (value) =>
        value.length >= 8
          ? null
          : "Password must be at least 8 characters long",
      confirmPassword: (value, { password }) =>
        value === password ? null : "Passwords doesnt match",
      company: (value) => (value),
      toc: (value) =>
        value ? null : "You must agree to our terms and conditions",
    },
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const res = await signup({
      email: values.email,
      full_name: values.fullname,
      password: values.password,
      role: recruiter ? "manager" : "user",
    });
    if (res) {
      showNotification({
        title: "Success",
        message: "You have been registered successfully",
        color: "teal",
        autoClose: 2000,
      });
      navigate((recruiter ? "/recruiter" : "") + "/login");
    } else {
      showNotification({
        title: "Error",
        message: "Something went wrong",
        color: "red",
        autoClose: 2000,
      });
    }
    console.log(res);
    setLoading(false);
  };
  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  return (
    <div
      style={{ height: "100vh", backgroundColor: "black" }}
      className="pattern-bg"
    >
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
                    Sign Up to continue
                  </Text>
                  <TextInput
                    mb={13}
                    withAsterisk
                    label="Full Name"
                    placeholder="urmom"
                    {...form.getInputProps("fullname")}
                  />
                  <TextInput
                    mb={13}
                    withAsterisk
                    label="Email"
                    placeholder="urmom@gmail.com"
                    {...form.getInputProps("email")}
                  />
                  <PasswordInput
                    mb={13}
                    withAsterisk
                    label="Password"
                    placeholder="********"
                    {...form.getInputProps("password")}
                  />
                  <PasswordInput
                    mb={13}
                    withAsterisk
                    label="Confirm Password"
                    placeholder="********"
                    {...form.getInputProps("confirmPassword")}
                  />
                  <Checkbox
                    mt={10}
                    {...form.getInputProps("toc", { type: "checkbox" })}
                    label="Keep me signed in"
                  />
                  <Button fullWidth type="submit" mt={20} loading={loading}>
                    <Text my={20} sx={{ fontWeight: "600", fontSize: "1rem" }}>
                      Sign Up
                    </Text>
                  </Button>
                </form>
                <Text mt={10} sx={{ fontWeight: "600", fontSize: "0.9rem" }}>
                  Already have an account?{" "}
                  <Link
                    mt={10}
                    style={{ textDecoration: "none" }}
                    to={"/login"}
                  >
                    <Text variant="link" sx={{ display: "inline" }}>
                      Login
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

export default Register;
