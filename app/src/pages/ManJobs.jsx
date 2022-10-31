import { useState } from 'react';
import { Box, Button, Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';
import MainWrapper from '../components/MainWrapper';
import CreateJobForm from '../components/CreateJobForm';

const h_jobs = [{
	company: 'Company',
	role: 'Software Engineer',
	description: 'hehe im desc',
	location: 'Banglore',
	salary: 90000,
	remote: true,
	req_skills: ['C', 'C++', 'Java'],
	req_experience: 1
}, {
	company: 'Company',
	role: 'Software Engineer',
	description: 'hehe im desc',
	location: 'Banglore',
	salary: 90000,
	remote: true,
	req_skills: ['C', 'C++', 'Java'],
	req_experience: 1
}, {
	company: 'Company',
	role: 'Software Engineer',
	description: 'FU',
	location: 'Banglore',
	salary: 90000,
	remote: true,
	req_skills: ['C', 'C++', 'Java'],
	req_experience: 1
}]

const ManJobs = () => {
	const [opened, setOpened] = useState(false);
	const [jobs, setJobs] = useState(h_jobs);

	return (
		<MainWrapper>
			<CreateJobForm opened={opened} setOpened={setOpened} setJobs={setJobs} />
			<Container mt="xl" mb="xl" px="xl">
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<h1>Posted Jobs</h1>
					<Button variant="filled" size="sm" onClick={() => setOpened(true)}>Create a Job</Button>
				</Box>
				<br />
				<Grid px={25}>
					{jobs.map((job, index) => (
						<Grid.Col key={index}>
							<JobCard job={job} />
						</Grid.Col>
					))}
				</Grid>
			</Container>
		</MainWrapper>
	)
}

export default ManJobs;