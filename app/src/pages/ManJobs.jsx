import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';
import MainWrapper from '../components/MainWrapper';
import CreateJobForm from '../components/CreateJobForm';
import useAuth from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs } from '../store/userReducer';

const ManJobs = () => {
	const [opened, setOpened] = useState(false);
	const { jobs } = useSelector(state => state.user)
	const { getJobs } = useAuth()
	const dispatch = useDispatch();

	useEffect(() => {
		getJobs().then(res => {
			dispatch(setJobs(res));
		}).catch(err => {
			console.log(err);
		})
	}, [])

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
					{jobs?.map((job, index) => (
						<Grid.Col lg={6} key={index}>
							<JobCard job={job} />
						</Grid.Col>
					))}
				</Grid>
			</Container>
		</MainWrapper>
	)
}

export default ManJobs;