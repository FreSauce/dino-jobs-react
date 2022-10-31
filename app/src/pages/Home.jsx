import { Button, Container, Group, Stack } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Container
        className="pattern-bg"
        fluid
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Group
          sx={{
            width: "100%",
          }}
          grow
        >
          <Stack px="xl">
            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: "bold",
                fontFamily: "Open Sans",
                color: "#fff",
              }}
            >
              Best Platform To Get
              <br /> Your{" "}
              <span
                className="text"
                style={{
                  fontWeight: "900",
                  fontSize: "3.4rem",
                  textTransform: "uppercase",
                  color: "#f44",
                }}
              >
                <span style={{ fontSize: "3.9rem" }}>D</span>ream{" "}
                <span style={{ fontSize: "3.9rem" }}>J</span>ob
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#ccc",
              }}
            >
              With DinoJobs, you can find job that suits your skills and <br />
              experience. We have a lot of job opportunities for you. Also,{" "}
              <br />
              we provide the best interview scheduling and handling system.
            </p>
            <Group py="md">
              <Button variant="filled" color="white" size="lg">
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Get Hired
                </Link>
              </Button>
              <Button variant="light" color="white" size="lg">
                <Link
                  to="/recruiter/login"
                  style={{ textDecoration: "none", color: "#eee" }}
                >
                  Hire Talents
                </Link>
              </Button>
            </Group>
          </Stack>
          <Stack></Stack>
        </Group>
      </Container>
    </div>
  );
};

export default Home;
