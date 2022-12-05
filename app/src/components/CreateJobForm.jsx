import { useForm } from "@mantine/form";
import {
	Modal,
	Button,
	Group,
	Stepper,
	TextInput,
	Radio,
	Checkbox,
	Box,
	MultiSelect,
} from "@mantine/core";
import { useState } from "react";
import useAuth from "../hooks/useAuth";


const skillData = [
	{
		value: 'c',
		label: 'C'
	},
	{
		value: 'c++',
		label: 'C++'
	},
	{
		value: 'java',
		label: 'Java'
	},
]

const CreateJobForm = ({ opened, setOpened, setJobs }) => {
	const { createJobs } = useAuth();
	const form = useForm({
		initialValues: {
			role: "",
			remote: "",
			description: "",
			company: "",
			location: "",
			salary: 0,
			req_skills: [],
			req_experience: "",
		},
	});
	const [active, setActive] = useState(0);
	const [btn, setBtn] = useState("Next Step");
	const nextStep = () => {
		console.log(btn);
		if (btn === "Submit") {
			// form.onSubmit((values) => {
			const values = form.values;
			setJobs(prev => [...prev, values])
			console.log(form.values);
			setOpened(false);
			createJobs(values).then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			})
			// });
		}
		if (active === 2) {
			setBtn("Submit");
		}
		else {
			setBtn("Next Step");
		}
		setActive((current) => (current < 3 ? current + 1 : current));
	};
	const prevStep = () => {

		if (active === 2) {
			setBtn("Submit");
		}
		else {
			setBtn("Next Step");
		}
		setActive((current) => (current > 0 ? current - 1 : current))
	}

	return (
		<>
			<Modal centered opened={opened} onClose={() => { setActive(0); setOpened(false) }} title={''} size="xl">
				<Stepper active={active} onStepClick={setActive} breakpoint="sm">
					<Stepper.Step p={20} label="First step">
						<Box px={30}>
							<TextInput
								label="Role"
								placeholder="Role*"
								{...form.getInputProps("role")}
								mb={13}
								required
							/>
							<TextInput
								label="Description"
								placeholder="Description"
								{...form.getInputProps("description")}
								mb={13}
							/>
							<TextInput
								label="Location"
								placeholder="Location"
								{...form.getInputProps("location")}
								mb={13}
								required
							/>
						</Box>
					</Stepper.Step>
					<Stepper.Step p={20} label="Second step">
						<Box px={30}>

							<TextInput
								label="Company"
								placeholder="Company*"
								{...form.getInputProps("company")}
								mb={13}
								required
							/>
							<TextInput
								type="Number"
								label="Salary"
								placeholder="Salary*"
								{...form.getInputProps("salary")}
								mb={13}
								required
							/>
						</Box>
					</Stepper.Step>
					<Stepper.Step p={20} label="Final step">
						<Box px={30}>
							<Radio.Group
								name="Remote or In Person"
								label="Select your favorite state of work"
								description=""
								withAsterisk
								mb={13}
								{...form.getInputProps("remote")}
							>
								<Radio value="true" label="Remote" />
								<Radio value="false" label="Non-Remote" />
							</Radio.Group>
							<MultiSelect
								data={skillData}
								label="Required Skills"
								required
								{...form.getInputProps("req_skills")}
								withAsterisk
							/>
							<TextInput
								type="Number"
								label="Experience"
								placeholder="Experience (in years)"
								{...form.getInputProps("req_experience")}
								required
								mb={13}
							/>
						</Box>
					</Stepper.Step>
					<Stepper.Completed>
						Completed, click back button to get to previous step
					</Stepper.Completed>
				</Stepper>
				<Group position="center" mt="xl">
					<Button variant="default" onClick={prevStep}>
						Back
					</Button>
					<Button onClick={nextStep}>{btn}</Button>
				</Group>
			</Modal>
		</>
	);
};

export default CreateJobForm;