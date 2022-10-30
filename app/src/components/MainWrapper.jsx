import { AppShell } from '@mantine/core'
import React from 'react'
import Header from './Header'
import Navbar from './Navbar'

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
			{children}
		</AppShell>
	)
}

export default MainWrapper