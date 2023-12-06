import { configureStore } from '@reduxjs/toolkit'
import { productsReducer } from './slices/products'
import { authReducer } from './slices/auth'

export const store = configureStore({
	reducer: {
		products: productsReducer,
		auth: authReducer
	}
})