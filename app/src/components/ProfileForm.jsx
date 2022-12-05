import { useRef, useState } from 'react';
import { Stepper, Button, Group, TextInput, NumberInput, Textarea, Modal, Badge, Box, FileInput, Grid, Image, Input } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IconAt, IconUser, IconHome } from '@tabler/icons';
import useAuth from '../hooks/useAuth';
import validator from "validator";
import { FaUserCircle } from 'react-icons/fa';
import styles from './components.module.css';
import { useSelector } from 'react-redux';


const ProfileForm = () => {
	const { user } = useSelector(state => state.auth);
	const [skillSet, setSkillSet] = useState([]);
	const [skill, setSkill] = useState('');
	const [opened, setOpened] = useState(false);
	const [active, setActive] = useState(0);
	const [btn, setBtn] = useState("Next Step");
	const imageRef = useRef(null);
	const imageContainer = useRef(null);

	const nextStep = () => {
		if (btn === "Submit") {
			form.onSubmit((values) => {
				console.log(values);
			});
		}
		if (active === 3) {
			setBtn("Submit");
		}
		else {
			setBtn("Next Step");
		}
		setActive((current) => (current < 3 ? current + 1 : current));
	};
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));
	const form = useForm({
		initialValues: {
			fullname: user.full_name,
			email: user.email,
			company: user.role === 'manager' ? user.company : null,
			logo: '',
			phone: user.phone || '',
			address: user.address || '',
			bio: user.bio || '',
			skills: user.skills || [],
			applied_jobs: [],
		},
		validate: {
			fullname: (value) => (value !== '' ? null : 'Full Name is required'),
			email: (value) => (validator.isEmail(value) ? null : "Invalid Email"),

		}
	});
	const skillHandler = () => {
		setOpened(false)
		setSkillSet([...skillSet, skill])
		form.setFieldValue("skills", [...form.values.skills, skill]);
		setSkill('')
	}
	const handleImage = (event) => {
		// event.preventDefault();
		imageRef.current.click();
	}

	const handleImageChange = (event) => {
		// event.preventDefault();
		const file = event.target.files[0];
		console.log(file);
		let url = URL.createObjectURL(file);
		console.log(url)
		imageContainer.current.src = url;
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Add Skill"
			>
				<TextInput
					label="Skill"
					placeholder="Skill"
					{...form.getInputProps("skills")}
					icon={<IconUser size={14} />}
					required
					value={skill}
					onChange={(e) => { setSkill(e.target.value) }}
				/>
				<Button mt="xs" onClick={skillHandler}>Add</Button>
			</Modal>
			<Stepper active={active} onStepClick={setActive} breakpoint="sm">
				<Stepper.Step label="First step" >
					<Grid mt={20} mb={40} sx={{ justifyContent: 'space-between' }}>
						<Grid.Col span={6} sx={{ justifyContent: 'center' }}>
							<TextInput
								label="Full Name"
								placeholder="Full Name*"
								{...form.getInputProps("fullname")}
								icon={<IconUser size={14} />}
								required
								mb={13}
							/>
							<TextInput
								label="Email"
								placeholder="Email*"
								disabled
								{...form.getInputProps("email")}
								icon={<IconAt size={14} />}
								required
							/>
						</Grid.Col>
						<Grid.Col span={4}>
							<Input {...form.getInputProps('logo')} type={'file'} alt='image' onChange={handleImageChange} accept='image/*' hidden ref={imageRef} />
							<img src={'https://icons.veryicon.com/png/o/miscellaneous/font-awesome-2/user-circle-o-2.png'} onClick={handleImage} style={{ filter: 'invert(0.6)', width: '150px', height: '150px', display: 'flex', justifyContent: 'center' }} ref={imageContainer} />
						</Grid.Col>
					</Grid>

				</Stepper.Step>
				<Stepper.Step label="Second step" >
					{user.role === 'manager' &&
						<TextInput
							label="Company"
							placeholder="Company"
							{...form.getInputProps("company")}
							icon={<IconHome size={14} />}
						/>
					}
					<NumberInput
						label="Phone Number"
						placeholder="Phone Number"
						{...form.getInputProps("phone")}
						icon={<IconHome size={14} />}
					/>
					<TextInput
						label="Address"
						placeholder="Address"
						{...form.getInputProps("address")}
						icon={<IconHome size={14} />}
					/>
				</Stepper.Step>
				<Stepper.Step label="Final step" >
					<Textarea
						label="Bio"
						placeholder="Bio"
						{...form.getInputProps("bio")}
					/>
					{skillSet.map((skil) => <Badge mt="xs" mr="xs" size="lg">{skil}</Badge>)}
					<br />
					<Button onClick={() => setOpened(true)} mt="xs" >
						Add Skills
					</Button>

				</Stepper.Step>
				<Stepper.Completed>

				</Stepper.Completed>
			</Stepper>

			<Group position="center" mt="xl">
				<Button variant="default" onClick={prevStep}>Back</Button>
				<Button onClick={nextStep}>{btn}</Button>
			</Group>
		</>
	);
}

export default ProfileForm;