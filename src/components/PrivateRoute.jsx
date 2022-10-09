import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const PrivateRoute = () => {
	const { state } = useContext(AuthContext);
	return state?.user ? <Outlet /> : <Navigate to={'/login'} />
}

export default PrivateRoute