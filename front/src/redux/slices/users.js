import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAllUsers = createAsyncThunk('/users/fetchAllUsers', async () => {
	const { data } = await axios.get('/admin/users');
	return data;
});

const initialState = {
	users: {
		items: [],
		status: 'loading'
	}
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllUsers.pending]: (state) => {
			state.users.items = []
			state.users.status = 'loading'
		},
		[fetchAllUsers.rejected]: (state) => {
			state.users.items = []
			state.users.status = 'error'
		},
		[fetchAllUsers.fulfilled]: (state, action) => {
			state.users.items = action.payload
			state.users.status = 'loaded'
		}
	}
});

export const usersReducer = usersSlice.reducer;