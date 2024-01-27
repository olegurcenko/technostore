import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchMakeOrder = createAsyncThunk('product/fetchMakeOrder', async () => {
	const { data } = await axios.post('/product/makeorder');
	return data;
});

export const fetcAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
	const { data } = await axios.get('/admin/orders');
	return data;
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
	const { data } = await axios.get('/orders');
	return data;
});

const initialState = {
	orders: {
		items: [],
		status: 'loading'
	}
};

const orderSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
	extraReducers: {
		[fetcAllOrders.pending]: (state) => {
			state.orders.items = []
			state.orders.status = 'loading'
		},
		[fetcAllOrders.fulfilled]: (state, action) => {
			state.orders.items = action.payload
			state.orders.status = 'loaded'
		},
		[fetcAllOrders.rejected]: (state) => {
			state.orders.items = []
			state.orders.status = 'error'
		},
		[fetchMakeOrder.pending]: (state) => {
			state.orders.items = []
			state.orders.status = 'loading'
		},
		[fetchMakeOrder.fulfilled]: (state, action) => {
			state.orders.items = action.payload
			state.orders.status = 'loaded'
		},
		[fetchMakeOrder.rejected]: (state) => {
			state.orders.items = []
			state.orders.status = 'error'
		},
		[fetchOrders.pending]: (state) => {
			state.orders.items = []
			state.orders.status = 'loading'
		},
		[fetchOrders.fulfilled]: (state, action) => {
			state.orders.items = action.payload
			state.orders.status = 'loaded'
		},
		[fetchOrders.rejected]: (state) => {
			state.orders.items = []
			state.orders.status = 'error'
		}
	}
});

export const orderReducer = orderSlice.reducer;