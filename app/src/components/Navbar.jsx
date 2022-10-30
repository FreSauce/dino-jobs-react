import React from 'react'
import { ActionIcon, Group, Navbar as BaseNavbar, Stack, Text } from '@mantine/core'
import styles from './components.module.css';
import { AiFillHome, AiFillProfile } from 'react-icons/ai';

const data = [
	{
		name: 'Home',
		icon: AiFillHome,
	}, {
		name: 'Profile',
		icon: AiFillProfile
	}, {
		name: 'Home',
		icon: AiFillHome,
	}, {
		name: 'Profile',
		icon: AiFillProfile
	}
]

const Navbar = () => {
	return (
		<BaseNavbar className={styles.navbar} p="xs">
			<Group spacing={30}>
				{data?.map((d, index) => (
					<Stack className={styles.navitem} spacing={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
						<d.icon size={28} />
						<Text size={13}>{d.name}</Text>
					</Stack>
				))}
			</Group>
		</BaseNavbar>
	)
}

export default Navbar