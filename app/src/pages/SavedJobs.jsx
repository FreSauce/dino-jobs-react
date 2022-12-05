import React from 'react'
import MainWrapper from '../components/MainWrapper';
import { Container, Grid } from '@mantine/core';
import useAuth from '../hooks/useAuth';
import JobCard from '../components/JobCard';
import { useSelector } from 'react-redux';


const SavedJobs = () => {
	const { saved_jobs, applied_jobs } = useSelector(state => state.user);

	return (
		<MainWrapper>
			<div style={{ display: "flex" }}>
				<Container mt="xl" mb="xl" >
					<h1>Saved jobs</h1>
					<br />
					<Grid px={25}>
<<<<<<< HEAD
						{saved_jobs?.map((job, index) => (
							<Grid.Col key={index}>
								<JobCard job={job} saved={true} applied={applied_jobs?.some(j => j._id === job._id)} savI={true} />
=======
					{console.log('From SavedJobs.jsx', savedJobs)}
						{savedJobs?.map((job, index) => (
							<Grid.Col key={index}>
								
								<JobCard job={job} saved={true} setSavedJobs={setSavedJobs} />
>>>>>>> 0fde23304fe173396232d0113bfc6ef4c58eec5a
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</div>
		</MainWrapper>
	);
}

export default SavedJobs