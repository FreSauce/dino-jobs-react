import React from 'react'
import { Navbar as BaseNavbar } from '@mantine/core'
import styles from './components.module.css';

const Navbar = () => {
	return (
		<BaseNavbar className={styles.navbar} sx={{}} p="xs">
			navbar
		</BaseNavbar>
	)
}

export default Navbar