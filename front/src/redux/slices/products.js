import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
	const { data } = await axios.get('/product')
	return data
})

export const fetchProductsByType = createAsyncThunk('product/fetchProductsByType', async (type) => {
	const { data } = await axios.get(`/product/search/${type}`)
	return data;
})

const initialState = {
	products: {
		items: [],
		status: 'loading'
	}
}

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.products.items = []
			state.products.status = 'loading'
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.products.items = action.payload
			state.products.status = 'loaded'
		},
		[fetchProducts.rejected]: (state) => {
			state.products.items = []
			state.products.status = 'error'
		},
		[fetchProductsByType.pending]: (state) => {
			state.products.items = []
			state.products.status = 'loading'
		},
		[fetchProductsByType.fulfilled]: (state, action) => {
			state.products.items = action.payload
			state.products.status = 'loaded'
		},
		[fetchProductsByType.rejected]: (state) => {
			state.products.items = []
			state.products.status = 'error'
		},
	}
})

export const productsReducer = productSlice.reducer