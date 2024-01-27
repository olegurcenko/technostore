import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	adress: {
		type: String,
		required: true,	
	},
	email: {
		type: String,
		required: true,
	},
	items: {
		type: Array,
		required: true,
		default: []
	},
}, {
	timestamps: true,
})

export default mongoose.model('Order', OrderSchema)
//joy.schema