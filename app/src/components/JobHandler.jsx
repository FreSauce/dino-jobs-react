import React from 'react'
import { useSelector } from 'react-redux'
import Jobs from '../pages/Jobs'
import ManJobs from '../pages/ManJobs'

const JobHandler = () => {
	const { user } = useSelector(state => state.auth)

	if (user.role === 'manager') {
		return <ManJobs />
	} else {
		return <Jobs />
	}

}

export default JobHandler