import {
	Card,
	Text,
	Badge,
	Group,
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
			<Card shadow="sm" radius="md" withBorder>
				<Group ml="xs">

					<Card>
						<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
							{user?.full_name}
						</Text>
						<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
							{user?.email}
						</Text>
						<Text sx={{ fontWeight: "500", fontSize: "0.8rem" }}>
							{user?.phone}
						</Text>

					</Card>
				</Group>
				<Group>
					{user?.skills.map((skill, index) => (
						<Badge key={index}>
							{skill}
						</Badge>
					))}
				</Group>
				<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
					{user?.bio}
				</Text>
				<Text sx={{ fontWeight: "600", fontSize: "1rem" }}>
					{user?.address}
				</Text>
			</Card >
		</>
	);
};

export default ProfileCard;
