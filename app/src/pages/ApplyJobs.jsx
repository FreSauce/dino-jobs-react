import React from 'react'
import MainWrapper from '../components/MainWrapper';
import { Container, Grid } from '@mantine/core';
import JobCard from '../components/JobCard';
import { useSelector } from 'react-redux';


const AppliedJobs = () => {
	const { applied_jobs } = useSelector(state => state.user)


	return (
		<MainWrapper>
			<div style={{ display: "flex" }}>
				<Container mt="xl" mb="xl" >
					<h1>Applied jobs</h1>
					<br />
					<Grid px={25}>
						{applied_jobs?.map((job, index) => (
							<Grid.Col key={index}>
								<JobCard job={job} applyI={true} />
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</div>
		</MainWrapper>
	);
}

export default AppliedJobs;