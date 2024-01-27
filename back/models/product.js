import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true,
    },
    long_description: {
        type: String,
        required: true,
    },
    parameters: {
        type: Array,
        default: [],
    },
    price: {
        type: Number,
        required: true,
    },
    reviews: [
        {
            body: String, 
            points: Number,
        }
    ],
    images: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
})

export default mongoose.model('Product', ProductSchema)