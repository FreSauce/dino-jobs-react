import { createSlice } from '@reduxjs/toolkit';


export const userReducer = createSlice({
	name: 'user',
	initialState: {
		jobs: [],
		applied_jobs: [],
		saved_jobs: []
	},
	reducers: {
		setJobs: (state, action) => {
			state.jobs = action.payload;
		},
		setAppliedJobs: (state, action) => {
			state.applied_jobs = action.payload;
		},
		setSavedJobs: (state, action) => {
			state.saved_jobs = action.payload;
		},
		addAppliedJob: (state, action) => {
			state.applied_jobs.push(action.payload);
		},
		addSavedJob: (state, action) => {
			state.saved_jobs.push(action.payload);
		},
		removeAppliedJob: (state, action) => {
			state.applied_jobs = state.applied_jobs.filter((job) => job._id !== action.payload);
		},
		removeSavedJob: (state, action) => {
			state.saved_jobs = state.saved_jobs.filter((job) => job._id !== action.payload);
		}
	}
})

export const { setJobs, setAppliedJobs, setSavedJobs, removeAppliedJob, removeSavedJob, addAppliedJob, addSavedJob } = userReducer.actions;

export default userReducer.reducer;