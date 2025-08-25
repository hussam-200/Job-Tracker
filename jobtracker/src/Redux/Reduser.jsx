import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    user: null,
    loading: false,
    error: null,
    job: []
}

const users = createSlice({
    name: "Users",
    initialState,
    reducers: {
        loading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.user = null;
        },
        register: (state, action) => {
            state.user = action.payload;
            state.error = null;
        },
        login: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: () => {
            return initialState;
        },
        addJob: (state, action) => {
            state.job.push({
                ...action.payload,
                uid: state.user.uid
            })
        },
        removeJob: (state, action) => {
            state.job = state.job.filter((job) => (
                job.id !== action.payload
            ))
        }, updateJob: (state, action) => {
            const { id, updatedJob } = action.payload;
            state.jobs = state.jobs.map((job) =>
                job.id === id ? { ...job, ...updatedJob } : job
            )
        }, clearError: (state) => {
            state.error = null;
        }
    }
})

export const { register, setError, loading, login, logoutUser, addJob, removeJob, updateJob,clearError } = users.actions;

export default users.reducer;