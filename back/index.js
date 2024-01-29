import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import stripe from 'stripe'
import { userValidator } from './validations/userDataValidator.js'
import { errorsHandler } from './utils/errorsHandler.js'
import { userAuth, adminAuth } from './utils/auth.js'
import { userController, adminController, productController } from './controllers/index.js'
import { adminValidator } from './validations/adminDataValidator.js'

mongoose.connect(
    'mongodb+srv://admin:admin12345@cluster0.damqkmb.mongodb.net/?retryWrites=true&w=majority'
)

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const app = express();

app.use(cors());

app.use(express.json());

const upload = multer({ storage });

app.use('/api/uploads', express.static('uploads'));

//! user requests

app.post('/.netlify/functions/register', userValidator, errorsHandler, userController.register);

app.post('/.netlify/functions/login', userValidator, errorsHandler, userController.login);

app.post('/.netlify/functions/makeorder', userController.createOrder);

app.get('/.netlify/functions/orders', userController.getOrders);

app.get('/.netlify/functions/me', userAuth, userController.getMe);

//! admin requests

app.get('/.netlify/functions/admin/users', errorsHandler, adminController.getUsers);

app.post('/.netlify/functions/adminregister', adminValidator, errorsHandler, adminController.register);

app.post('/.netlify/functions/adminlogin', adminValidator, errorsHandler, adminController.login);

app.get('/.netlify/functions/admin/me', adminAuth, adminController.getMe);

app.get('/.netlify/functions/admin/orders', adminAuth, adminController.getOrders);

//! products requests

app.get('/.netlify/functions/product', productController.getAll);

app.get('/.netlify/functions/product/search/:type', productController.getByType);

app.get('/.netlify/functions/product/search/title/:title', productController.getByTitle);

app.get('/.netlify/functions/product/:id', productController.getOne);

app.post('/.netlify/functions/product/add/:id', userController.addItem);

app.post('/.netlify/functions/product/remove/:id', userController.removeItem);

app.post('/.netlify/functions/product', adminAuth, productController.create);

app.post('/.netlify/functions/product/:id', adminAuth, productController.remove);

app.post('/.netlify/functions/product/update/:id', adminAuth, productController.update);

//!upload, not display

app.post('/.netlify/functions/upload', upload.single('images'), (req, res) => {
    res.json({
        url: `/api/uploads/${req.file.originalname}`,
    });
});

module.exports = app;