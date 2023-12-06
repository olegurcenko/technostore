import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
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

const upload = multer({storage})

app.use(cors())

app.use('/uploads', express.static('uploads'))

//! user requests

app.post('/auth/register', userValidator, errorsHandler, userController.register)

app.post('/auth/login', userValidator, errorsHandler, userController.login)

app.post('/products/makeorder', userController.createOrder)

app.get('/auth/me', userAuth, userController.getMe)

//! admin requests

app.post('/auth/adminregister', adminValidator, errorsHandler, adminController.register)

app.post('/auth/adminlogin', adminValidator, errorsHandler, adminController.login)

//! products requests

app.get('/product', productController.getAll)

app.get('/product/search/:type', productController.getByType)

app.get('/product/:id', productController.getOne)

app.post('/product/add/:id', userController.addItem)

app.post('/product', adminAuth, productController.create)

app.post('/product/:id', adminAuth, productController.remove)

app.post('/product/update/:id', adminAuth, productController.update)

app.post('/upload', adminAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok')
})
