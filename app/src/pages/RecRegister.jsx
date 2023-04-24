import {
	Container,
	Grid,
	Box,
	TextInput,
	PasswordInput,
	NumberInput,
	Button,
	Text,
	Checkbox,
	MediaQuery,
	Stepper,
	Group
} from "@mantine/core";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import validator from "validator";
import useAuth from "../hooks/useAuth";
import { showNotification } from "@mantine/notifications";

const RecRegister = ({ recruiter }) => {
	const [loading, setLoading] = useState(false);
	const [btn, setBtn] = useState("Next Step");
	const { signup, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [active, setActive] = useState(0);

	const form = useForm({
		validateInputOnChange: true,
		initialValues: {
			full_name: "",
			email: "",
			password: "",
			confirmPassword: "",
			toc: false,
			company_name: "",
			description: "",
			website: '',
			employees: '',
			role: 'manager'
		},
		validate: {
			full_name: (value) => (value !== '' ? null : 'Full Name is required'),
			email: (value) => (validator.isEmail(value) ? null : "Invalid Email"),
			password: (value) =>
				value.length >= 5
					? null
					: "Password must be at least 8 characters long",
			confirmPassword: (value, { password }) =>
				value === password ? null : "Passwords doesnt match",
			company_name: (value) => (recruiter ? value ? null : 'Company name should be specified' : null),
			toc: (value) =>
				value ? null : "You must agree to our terms and conditions",
		},
	});


	const nextStep = async () => {
		setActive((current) => (current < 2 ? current + 1 : current));
		if (btn === "Submit") {
			console.log(form.values)
			const res = await signup({
				...form.values
			});
			console.log(res);
			if (res) {
				showNotification({
					title: "Success",
					message: "You have been registered successfully",
					color: "teal",
					autoClose: 2000,
				});
				navigate("/recruiter/login");
			} else {
				showNotification({
					title: "Error",
					message: "Something went wrong",
					color: "red",
					autoClose: 2000,
				});
			}
			setLoading(false);
		}

	}

	useEffect(() => {
		if (active > 0) {
			setBtn("Submit");
		}
		else {
			setBtn("Next Step");
		}
	}, [active])

	const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));


	if (user) {
		return <Navigate to={location.state?.from || "/"} replace />;
	}

	return (
		<>
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

									<Stepper active={active} onStepClick={setActive} breakpoint="sm">
										<Stepper.Step label="First step" description="Create an account">

											<Text mb={5} sx={{ fontWeight: "600", fontSize: "1.25rem" }}>
												Hello! Let's get started
											</Text>
											<Text mb={15} sx={{ fontWeight: "500", fontSize: "1.1rem" }}>
												Sign Up to continue
											</Text>
											<TextInput
												mb={13}
												withAsterisk
												required
												label="Full Name"
												placeholder="urmom"
												{...form.getInputProps("full_name")}
											/>
											<TextInput
												mb={13}
												withAsterisk
												required
												label="Email"
												placeholder="urmom@gmail.com"
												{...form.getInputProps("email")}
											/>

											<PasswordInput
												mb={13}
												withAsterisk
												required
												label="Password"
												placeholder="********"
												{...form.getInputProps("password")}
											/>
											<PasswordInput
												mb={13}
												withAsterisk
												required
												label="Confirm Password"
												placeholder="********"
												{...form.getInputProps("confirmPassword")}
											/>
											<Checkbox
												mt={10}
												{...form.getInputProps("toc", { type: "checkbox" })}
												label="Keep me signed in"
											/>

										</Stepper.Step>
										<Stepper.Step label="Second step" description="Create Company">
											<TextInput
												mb={13}
												withAsterisk
												label="Company Name"
												placeholder="Compay Name"
												{...form.getInputProps("company_name")}
												required
											/>
											<TextInput
												mb={13}
												withAsterisk
												label="Description"
												placeholder="Description"
												{...form.getInputProps("description")}
												required
											/>
											<TextInput
												mb={13}
												withAsterisk
												label="Logo"
												placeholder="Logo"
												{...form.getInputProps("logo")}
											/>
											<NumberInput
												mb={13}
												withAsterisk
												label="Employees"
												placeholder="Employees"
												{...form.getInputProps("employees")}
											/>

										</Stepper.Step>
										<Stepper.Completed>

										</Stepper.Completed>
									</Stepper>

									<Group position="center" mt="xl">
										<Button variant="default" onClick={prevStep}>Back</Button>
										<Button onClick={nextStep}>{btn}</Button>
									</Group>



									<Text mt={10} sx={{ fontWeight: "600", fontSize: "0.9rem" }}>
										Already have an account?{" "}
										<Link
											mt={10}
											style={{ textDecoration: "none" }}
											to={"/recruiter/login"}
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
		</>
	);
};

export default RecRegister;
