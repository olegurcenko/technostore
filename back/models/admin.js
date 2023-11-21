import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
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
	permissions: {
		type: Array,
	},
}, {
	timestamps: true,
},
)

export default mongoose.model('Admin', AdminSchema)