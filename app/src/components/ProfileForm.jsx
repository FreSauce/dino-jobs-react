import { Fragment, useEffect, useRef, useState } from 'react';
import { Stepper, Button, Group, TextInput, NumberInput, Textarea, Modal, Badge, Grid, Input, FileButton, Text } from '@mantine/core';
import { useForm } from "@mantine/form";
import { IconAt, IconUser, IconHome } from '@tabler/icons';
import useAuth from '../hooks/useAuth';
import validator from "validator";
import styles from './components.module.css';
import { useSelector } from 'react-redux';
import { showNotification } from "@mantine/notifications";


const ProfileForm = () => {
	const { updateProfile } = useAuth();
	const { user } = useSelector(state => state.auth);
	const [skillSet, setSkillSet] = useState([]);
	const [logo, setLogo] = useState(null);
	const [companyLogo, setCompanyLogo] = useState(null);
	const [skill, setSkill] = useState('');
	const [opened, setOpened] = useState(false);
	const [active, setActive] = useState(0);
	const [btn, setBtn] = useState("Next Step");
	const [file, setFile] = useState(null);
	const imageRef = useRef(null);
	const imageContainer = useRef(null);
	const imageCompRef = useRef(null);
	const imageCompContainer = useRef(null);

	useEffect(() => {
		if (active === 3) {
			setBtn("Submit");
		} else {
			setBtn("Next Step");
		}
	}, [active])

	const handleUpdate = () => {
		const updateForm = new FormData();
		updateForm.append('full_name', form.values.fullname);
		updateForm.append('email', form.values.email);
		updateForm.append('phone', form.values.phone);
		updateForm.append('address', form.values.address);
		updateForm.append('bio', form.values.bio);
		updateForm.append('skills', form.values.skills);
		if (user.role === 'manager') {
			updateForm.append('name', form.values.companyName);
			updateForm.append('employees', form.values.companyEmployees);
			updateForm.append('website', form.values.companyWebsite);
			updateForm.append('description', form.values.companyDescription);
			if (companyLogo) {
				updateForm.append('company_logo', companyLogo, companyLogo.name);
			}
		}
		if (logo) {
			updateForm.append('avatar', logo, logo.name);
		}
		if (user.role !== 'manager' && file) {
			updateForm.append('resume', file, file.name);
		}
		updateProfile(updateForm).then(res => {
			showNotification({
				title: "Success",
				message: "user have been successfully updated",
				color: "teal",
				autoClose: 2000,
			});
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}).catch(err => {
			showNotification({
				title: "Error",
				message: "Something went wrong",
				color: "red",
				autoClose: 2000,
			});

		});

	}

	const nextStep = () => {
		if (btn === "Submit") {
			handleUpdate();
		}
		setActive((current) => (current < 3 ? current + 1 : current));
	};
	const prevStep = () =>
		setActive((current) => (current > 0 ? current - 1 : current));

	const form = useForm({
		initialValues: {
			fullname: user.full_name,
			email: user.email,
			companyName: user.role === 'manager' ? user.company.name : null,
			companyWebsite: user.role === 'manager' ? user.company.website : null,
			companyEmployees: user.role === 'manager' ? user.company.employees : null,
			companyLogo: user.role === 'manager' ? user.company.logo : null,
			companyDescription: user.role === 'manager' ? user.company.description : null,
			phone: parseInt(user.phone) || '',
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

	useEffect(() => {
		setSkillSet(user.skills);
	}, [])

	const skillHandler = () => {
		setOpened(false)
		setSkillSet([...skillSet, skill])
		form.setFieldValue("skills", [...form.values.skills, skill]);
		setSkill('')
	}
	const handleImage = (event) => {
		imageRef.current.click();
	}

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		console.log(file);
		setLogo(file);
		let url = URL.createObjectURL(file);
		imageContainer.current.src = url;
	}

	const handleCompanyImage = (event) => {
		imageCompRef.current.click();
	}

	const handleCompanyImageChange = (event) => {
		const file = event.target.files[0];
		console.log(file);
		setCompanyLogo(file);
		let url = URL.createObjectURL(file);
		imageCompContainer.current.src = url;
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
							<Input type={'file'} alt='image' onChange={handleImageChange} accept='image/*' hidden ref={imageRef} />
							<img src={user.avatar ? `http://localhost:3002/${user.avatar.replace('public/', '')}` : 'https://icons.veryicon.com/png/o/miscellaneous/font-awesome-2/user-circle-o-2.png'} onClick={handleImage} className={styles.profile_img} ref={imageContainer} alt={'profile'} />
						</Grid.Col>
					</Grid>

				</Stepper.Step>
				<Stepper.Step label="Second step" >
					{user.role === 'manager' ?
						<Grid mt={16} mb={8} sx={{ justifyContent: 'space-between' }}>
							<Grid.Col span={6} sx={{ justifyContent: 'center' }}>
								<TextInput
									label="Company Namwe"
									placeholder="Company Name"
									{...form.getInputProps("companyName")}
									icon={<IconUser size={14} />}
									required
								/>
								<TextInput
									label="Company Website"
									placeholder="Company Website"
									{...form.getInputProps("companyWebsite")}
									icon={<IconAt size={14} />}
									required
								/>
								<NumberInput
									label="Company Employees"
									placeholder="Company Employees"
									{...form.getInputProps("companyEmployees")}
									icon={<IconHome size={14} />}
								/>
								<Textarea
									label="Company Description"
									placeholder="Company Description"
									{...form.getInputProps("companyDescription")}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<Input type={'file'} alt='image' onChange={handleCompanyImageChange} accept='image/*' hidden ref={imageCompRef} />
								<img src={user.company.logo ? `http://localhost:3002/${user.company.logo.replace('public/', '')}` : 'https://icons.veryicon.com/png/o/miscellaneous/font-awesome-2/user-circle-o-2.png'} onClick={handleCompanyImage} className={styles.profile_img} ref={imageCompContainer} alt={'compProfile'} />
							</Grid.Col>
						</Grid> :
						<Fragment>
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
						</Fragment>
					}
				</Stepper.Step>
				<Stepper.Step label="Final step" >
					<Textarea
						label="Bio"
						placeholder="Bio"
						{...form.getInputProps("bio")}
					/>
					{skillSet.map((skil, index) => <Badge key={index} mt="xs" mr="xs" size="lg">{skil}</Badge>)}
					<br />
					<Button onClick={() => setOpened(true)} mt="xs" >
						Add Skills
					</Button>

				</Stepper.Step>
				<Stepper.Completed>
					{user.role === 'user' ?
						<Fragment>
							<Grid dir='horizontal'>
								<Grid.Col span={3}>
									<FileButton onChange={setFile} accept="pdf">
										{(props) => <Button {...props}>Upload Resume</Button>}
									</FileButton>
								</Grid.Col>
								<Grid.Col span={4}>
									{file && (
										<Text size="sm" align="center" mt="sm">
											Picked file: {file.name}
										</Text>
									)}
								</Grid.Col>
							</Grid>
							<Grid mt={24}>
								{user.resume ?
									<iframe width={'100%'} height={'400px'} src={`http://localhost:3002/${user.resume.replace('public/', '')}`} frameBorder="0" title='hehe' ></iframe> : <div></div>
								}
							</Grid>
						</Fragment>
						:
						<Fragment>
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
						</Fragment>
					}
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