import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAdminRegister = createAsyncThunk('/auth/fetchAdminAuth', async (params) => {
    const { data } = await axios.post('/auth/adminregister', params);
    return data;
});

export const fetchAuthAdminMe = createAsyncThunk('auth/fetchAuthAdminMe', async (params) => {
    const { data } = await axios.get('/auth/admin/me', params);
    return data;
});

export const fetchAdminAuth = createAsyncThunk('auth/fetchAdminAuth', async (params) => {
    const { data } = await axios.post('auth/adminlogin', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
    const { data } = await axios.get('/auth/me', params);
    return data;
});

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

const initialState = {
    data: null,
    status: 'loading'
};

const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: { 
        adminLogout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAdminAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAdminAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAdminAuth.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAdminRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAdminRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAdminRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAuthAdminMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthAdminMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthAdminMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        },
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },
    }
});

export const selectIsAdminAuth = state => Boolean(state.adminAuth.data);

export const selectIsAuth = state => Boolean(state.auth.data);

export const adminAuthReducer = adminAuthSlice.reducer;

export const { adminLogout } = adminAuthSlice.actions;

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;