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
						{saved_jobs?.map((job, index) => (
							<Grid.Col key={index}>
								<JobCard job={job} saved={true} applied={applied_jobs?.some(j => j._id === job._id)} savI={true} />
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</div>
		</MainWrapper>
	);
}

export default SavedJobs