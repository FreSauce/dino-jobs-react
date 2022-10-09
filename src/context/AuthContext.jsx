import React, { useEffect } from 'react'
import { useReducer } from 'react';
import { createContext } from 'react'
import authReducer from '../utils/authReducer';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const { state, dispatch } = useReducer(authReducer);

	useEffect(() => {

	}, []);


	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider