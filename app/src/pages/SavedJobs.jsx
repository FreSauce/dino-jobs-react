import React, { useState, useEffect } from 'react'
import MainWrapper from '../components/MainWrapper';
import { Container, Grid, Card, Slider, Input, Button } from '@mantine/core';
import useAuth from '../hooks/useAuth';
import JobCard from '../components/JobCard';


const SavedJobs = ({ savedJobs, setSavedJobs }) => {

	return (
		<MainWrapper>
			<div style={{ display: "flex" }}>
				<Container mt="xl" mb="xl" >
					<h1>Saved jobs</h1>
					<br />
					<Grid px={25}>
						{savedJobs?.map((job, index) => (
							<Grid.Col key={index}>
								<JobCard job={job} saved={true} setSavedJobs={setSavedJobs} />
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</div>
		</MainWrapper>
	);
}

export default SavedJobs