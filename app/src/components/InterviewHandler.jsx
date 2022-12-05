import React from 'react'
import { useSelector } from 'react-redux'
import Interview from '../pages/Interview'
import ManInterview from '../pages/ManInterview'


const InterviewHandler = () => {
	const { user } = useSelector(state => state.auth)

	if (user.role === 'manager') {
		return <ManInterview />
	} else {
		return <Interview />
	}
}

export default InterviewHandler