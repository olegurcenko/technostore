import { adminAuthReducer, authReducer } from './slices/auth'
import { productsReducer } from './slices/products'
import { configureStore } from '@reduxjs/toolkit'
import { orderReducer } from './slices/orders'
import { usersReducer } from './slices/users'

export const store = configureStore({
	reducer: {
		adminAuth: adminAuthReducer,
		products: productsReducer,
		orders: orderReducer,
		users: usersReducer,
		auth: authReducer,
	}
})