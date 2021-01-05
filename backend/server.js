import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products from './data/products.js'

dotenv.config()

// connect to the database
connectDB()

const app = express()

app.get('/', (req, res) => {
	res.send('Hello')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find(product => (product._id = req.params.id))
	res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
	PORT,
	console.log(
		`server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
	)
)
