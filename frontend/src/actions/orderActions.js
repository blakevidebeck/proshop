import axios from 'axios'
import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from '../constants/orderConstants'
import { logout } from './userActions'

// create an order
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
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

		// make a request to the backend to get the user object & token
		const { data } = await axios.post(`/api/orders`, order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				// generic message && custom error message ? custom error message : generic message
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// Get order details
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
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

		// make a request to the backend to get the user object & token
		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
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
			type: ORDER_DETAILS_FAIL,
			payload: message,
		})
	}
}
