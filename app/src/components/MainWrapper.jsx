import { AppShell } from '@mantine/core'
import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import styles from './components.module.css';

const MainWrapper = ({ children }) => {
	return (
		<AppShell
			padding="md"
			navbar={<Navbar />}
			header={<Header />}
			styles={(theme) => ({
				main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], minHeight: 'calc(100vh - 60px)' },
			})}
		>
			<div className={styles.main_div + ' custom-scroll'}>
				{children}
			</div>
		</AppShell>
	)
}

export default MainWrapper