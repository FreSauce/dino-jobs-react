import { AppShell } from '@mantine/core'
import React from 'react'
import Navbar from './Navbar'
import styles from './components.module.css';
import useAuth from '../hooks/useAuth';
import ManNavbar from './ManNavbar'
import { useSelector } from 'react-redux';

const MainWrapper = ({ children }) => {
	const { user } = useSelector(state => state.auth);

	return (
		<AppShell
			padding="md"
			navbar={user?.role === 'manager' ? <ManNavbar /> : <Navbar />}
			styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'calc(100vh - 60px)' },
			})}
		>
			{children}
		</AppShell>
	)
}

export default MainWrapper