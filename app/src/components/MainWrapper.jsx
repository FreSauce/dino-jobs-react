import { AppShell } from '@mantine/core'
import React from 'react'
import Navbar from './Navbar'
import styles from './components.module.css';
import useAuth from '../hooks/useAuth';

const MainWrapper = ({ children }) => {
	const { user } = useAuth();

	return (
		<AppShell
			padding="md"
			navbar={user?.role === 'manager' ? <Navbar /> : <Navbar />}
			styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'calc(100vh - 60px)' },
			})}
		>
			{children}
		</AppShell>
	)
}

export default MainWrapper