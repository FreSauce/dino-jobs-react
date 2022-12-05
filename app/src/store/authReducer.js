import { createSlice } from '@reduxjs/toolkit';


export const authReducer = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		token: null,
		loading: true
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem('token', action.payload)
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
		},
		loginUser: (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.loading = false;
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			localStorage.removeItem('token');
		}
	}
})

export const { updateUser, loginUser, logout, setToken, setLoading } = authReducer.actions;

export default authReducer.reducer;