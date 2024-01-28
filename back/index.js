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

.then(() => {
    console.log('db is connected')
})
.catch((error) => {
    console.log('db error: ', error)
})

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
})

const app = express()

app.use(express.json())

//const stripeInstance = stripe('sk_test_51Ocx0qLYGgmXoVpsC1mGKdd1pkI658RJaquQpcRx0ejLhvdFsBILKEtn8TC3yCsJjWaDZHKXGFjAh61ipykQBrWB00Crao9eeg');

const upload = multer({storage})

app.use(cors({
    origin: 'https://www.technostoreproj.com', // Replace with your frontend domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

app.use('/api/uploads', express.static('uploads'))

//! user requests

app.post('/api/auth/register', userValidator, errorsHandler, userController.register)

app.post('/api/auth/login', userValidator, errorsHandler, userController.login)

app.post('/api/product/makeorder', userController.createOrder)

app.get('/api/orders', userController.getOrders)

app.get('/api/auth/me', userAuth, userController.getMe)

//! admin requests

app.get('/api/admin/users', errorsHandler, adminController.getUsers)

app.post('/api/auth/adminregister', adminValidator, errorsHandler, adminController.register)

app.post('/api/auth/adminlogin', adminValidator, errorsHandler, adminController.login)

app.get('/api/auth/admin/me', adminAuth, adminController.getMe)

app.get('/api/admin/orders', adminAuth, adminController.getOrders)

//! products requests

app.get('/api/product', productController.getAll)

app.get('/api/product/search/:type', productController.getByType)

app.get('/api/product/search/title/:title', productController.getByTitle)

app.get('/api/product/:id', productController.getOne)

app.post('/api/product/add/:id', userController.addItem)

app.post('/api/product/remove/:id', userController.removeItem)

app.post('/api/product', adminAuth, productController.create)

app.post('/api/product/:id', adminAuth, productController.remove)

app.post('/api/product/update/:id', adminAuth, productController.update)

app.post('/api/upload', upload.single('images'), (req, res) => {
    res.json({
        url: `/api/uploads/${req.file.originalname}`,
    })
})

//! checkout request

//app.post('/create-checkout-session', async (req, res) => {
//    const { orderId, price } = req.body;
  
//    if (!orderId || !price) {
//      return res.status(400).json({ error: 'orderId and price are required in the request body.' });
//    }
  
//    try {
//      const session = await stripeInstance.checkout.sessions.create({
//        line_items: [
//          {
//            price: price,
//            quantity: 1,
//          },
//        ],
//        mode: 'payment',
//        success_url: `${YOUR_DOMAIN}?success=true`,
//        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//        client_reference_id: orderId, // Adding the orderId as a client reference ID
//      });
  
//      res.redirect(303, session.url);
//    } catch (error) {
//      console.error('Error creating checkout session:', error);
//      res.status(500).json({ error: 'Internal Server Error' });
//    }
//  });

//!

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})
