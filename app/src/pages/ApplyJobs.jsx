import React, { useEffect, useState } from 'react'
import MainWrapper from '../components/MainWrapper';
import { Container, Grid } from '@mantine/core';
import useAuth from '../hooks/useAuth';
import JobCard from '../components/JobCard';
import { useSelector, useDispatch } from 'react-redux';
import { setJobs } from '../store/userReducer';


const AppliedJobs = () => {
	const { jobs, applied_jobs } = useSelector(state => state.user)
	const dispatch = useDispatch();
	const { getJobs } = useAuth()


	useEffect(() => {
		getJobs().then(res => {
			dispatch(setJobs(res));
		}).catch(err => {
			console.log(err);
		})
	}, [])

	return (
		<MainWrapper>
			<div style={{ display: "flex" }}>
				<Container mt="xl" mb="xl" >
					<h1>Applied jobs</h1>
					<br />
					<Grid px={25}>
						{applied_jobs?.map((job, index) => (
							<Grid.Col key={index}>
								<JobCard job={jobs.find(jb => jb._id === job)} applyI={true} />
							</Grid.Col>
						))}
					</Grid>
				</Container>
			</div>
		</MainWrapper>
	);
}

export default AppliedJobs;