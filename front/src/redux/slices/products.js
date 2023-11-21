import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
	const { data } = await axios.get('/product')
	return data
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
		[fetchProducts.pendng]: (state) => {
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
		}
	}
})

export const productsReducer = productSlice.reducer