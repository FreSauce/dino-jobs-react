import { Box, Button, Container, Select } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MainWrapper from '../components/MainWrapper'
import ProfileCard from '../components/ProfileCard'
import useAuth from '../hooks/useAuth'
import { setJobs } from '../store/userReducer';


const ManInterview = () => {
	const { jobs } = useSelector(state => state.user)
	const man_jobs = jobs.map(job => ({ value: job._id, label: job.role }));
	const [selectedJob, setSelectedJob] = useState(null)
	const [applicants, setApplicants] = useState([])
	const [selectedApplicant, setSelectedApplicant] = useState(null);
	const { getApplicants } = useAuth();
	const { getJobs, sendInvite } = useAuth()
	const dispatch = useDispatch();

	useEffect(() => {
		getJobs().then(res => {
			dispatch(setJobs(res));
		}).catch(err => {
			console.log(err);
		})
	}, [dispatch, getJobs]);

	const getAppliedUsers = (job_id) => {
		setSelectedJob(job_id)
		getApplicants(job_id).then(res => {
			const re = res.map(user => ({ value: user.email, label: user.full_name }))
			setApplicants(re);
		})
	}
	const _sendInvite = async () => {
		console.log(selectedApplicant)
		sendInvite(selectedApplicant, selectedJob).then(re => {
			showNotification({
				title: 'Success',
				message: 'Invitation sent successfully',
				color: 'teal',
				icon: 'check-circle',
				autoClose: 2000,
			})
			window.open(`http://localhost:3001/interview/${re.link}`, "_blank")
		})
	}
	return (
		<MainWrapper>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<Select
						py={25}
						px={25}
						data={[...man_jobs]}
						label="Select Job"
						value={selectedJob}
						onChange={value => getAppliedUsers(value)}
					/>
					<Select
						py={25}
						px={25}
						data={[...applicants]}
						label="Select Applicant"
						value={selectedApplicant}
						onChange={value => setSelectedApplicant(value)}
					/>
				</Box>
				{selectedApplicant && <ProfileCard email={selectedApplicant} />}
				<Button
					variant="light"
					mt="xs"
					radius="md"
					color={'green'}
					onClick={_sendInvite}
					disabled={selectedApplicant === null}
				>
					Invite
				</Button>
			</Container>
		</MainWrapper>
	)
}

export default ManInterview