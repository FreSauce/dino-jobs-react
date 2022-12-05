import React, { useEffect, useState } from 'react'
import MainWrapper from '../components/MainWrapper'
import { Card, Image, Text, Badge, Button, Group, Container } from '@mantine/core';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Interview = () => {
	const [invites, setInvites] = useState([]);
	const { getAllInvites } = useAuth();

	useEffect(() => {
		getAllInvites().then(res => {
			setInvites(res);
			console.log(res)
		});
	}, [])

	return (
		<MainWrapper>
			<Container mt={20}>
				<h2 style={{ marginBottom: '20px' }}>Interviews Scheduled</h2>
				{
					invites.map((inv, index) => (
						<Card key={index} shadow="sm" style={{ marginBottom: '20px' }}>
							<Group ml="xs">
								<Image
									src={`${inv.job.company.logo}`}
									height={70}
									width={70}
									radius={5}
									alt="Norway"
								/>
								<Card>
									<Group position="apart">

										<Text sx={{ fontWeight: "600", fontSize: "1.4rem" }}>
											{inv.job.company.name}
										</Text>
										<Text sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
											• {inv.job.role}
										</Text>
									</Group>
									<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
										{inv.job.description}
									</Text>
									<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
										{inv.job.type}
									</Text>
									<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
										{inv.job.location}
									</Text>
								</Card>
								<Button variant="light" color="blue" fullWidth mt="md" radius="md">
									<Link style={{ color: 'white', textDecoration: 'none' }} target={'_blank'} to={`/interview/${inv.link}`}>
										Join
									</Link>
								</Button>
							</Group>
						</Card>
					))
				}
			</Container>
		</MainWrapper>
	)
}

export default Interview