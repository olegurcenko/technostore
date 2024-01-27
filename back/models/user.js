import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requirer: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
	adress: {
		type: String,
		required: false,
	},
	phoneNumber: {
		type: String,
		required: false,
	},
    activePreorderedItems: {
        type: Array,
        default: [],
    }
}, {
	timestamps: true,
},
)

export default mongoose.model('User', UserSchema)