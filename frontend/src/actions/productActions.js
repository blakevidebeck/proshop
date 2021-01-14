import axios from 'axios'

import {
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCEESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCEESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DELETE_SUCCEESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_SUCCEESS,
	PRODUCT_CREATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_SUCCEESS,
	PRODUCT_UPDATE_FAIL,
} from '../constants/productConstants'
import { logout } from './userActions'

// get all products
export const listProducts = () => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })

		// request to the backend for the products
		const { data } = await axios.get('/api/products')

		dispatch({ type: PRODUCT_LIST_SUCCEESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// get one product
export const listProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		// request to the backend for the single product
		const { data } = await axios.get(`/api/products/${id}`)

		dispatch({ type: PRODUCT_DETAILS_SUCCEESS, payload: data })
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// delete product
export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend
		await axios.delete(`/api/products/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCEESS,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: message,
		})
	}
}

// create a new product
export const createProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend
		const { data } = await axios.post(`/api/products`, {}, config)

		dispatch({
			type: PRODUCT_CREATE_SUCCEESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: message,
		})
	}
}

// update a product
export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		})

		// destructure the userInfo from the state
		const {
			userLogin: { userInfo },
		} = getState()

		// pass in the token from the user state to access protected routes
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}

		// make a request to the backend
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		)

		dispatch({
			type: PRODUCT_UPDATE_SUCCEESS,
			payload: data,
		})
	} catch (error) {
		const message =
			error.response && error.response.data.message
				? error.response.data.message
				: error.message
		if (message === 'Not authorized, token failed') {
			dispatch(logout())
		}
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: message,
		})
	}
}
