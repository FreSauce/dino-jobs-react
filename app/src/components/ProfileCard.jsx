import {
	Card,
	Text,
	Badge,
	Group,
	Image,
	Grid
} from "@mantine/core";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const ProfileCard = ({ email }) => {
	const { getProfile } = useAuth();
	const [user, setUser] = useState();

	useEffect(() => {
		getProfile(email).then((res) => {
			setUser(res);
		});
	}, [])

	return (
		<>
			<Card shadow="sm" p={15} radius="md" withBorder sx={{ width: '100%' }}>
				<Group position="apart">
					<Image
						src={`${process.env.REACT_APP_API_URL}/${user?.avatar?.replace('public/', '')}`}
						height={150}
						width={150}
						radius={10}
					/>
					<div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text weight={'bold'}>Name</Text>
							<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
								{user?.full_name}
							</Text>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text weight={'bold'}>Email</Text>
							<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
								{user?.email}
							</Text>
						</div>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<Text weight={'bold'}>Phone</Text>
							<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
								{user?.phone}
							</Text>
						</div>
					</div>

				</Group>
				<div style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px', paddingBottom: '20px' }}>
					<div style={{ display: 'flex', gap: '20px' }}>
						<Text weight={"bold"} >Skills</Text>
						{user?.skills.map((skill, index) => (
							<Badge key={index}>
								{skill}
							</Badge>
						))}
					</div>
					<div style={{ display: 'flex', gap: '20px' }}>
						<Text weight={"bold"} >Bio</Text>
						<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
							{user?.bio}
						</Text>
					</div>
					<div style={{ display: 'flex', gap: '20px' }}>
						<Text weight={"bold"} >Address</Text>

						<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
							{user?.address}
						</Text>
					</div>
				</div>
				{user?.resume ?
					<>
						<Text weight={"bold"} >Resume</Text>
						<iframe height={'400px'} width={'100%'} title="cv" src={`${process.env.REACT_APP_API_URL}/${user?.resume?.replace('public/', '')}`} />
					</>
					: null}
			</Card >
		</>
	);
};

export default ProfileCard;
