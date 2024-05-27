const express = require('express')
const app = express()
const postRoute = require('./routes/posts')
const userRoute = require('./routes/user')
const commentRoute = require('./routes/comment')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { cookie } = require('express-validator')
const AuthMiddleware = require('./helper/AuthMiddleware')
require('dotenv').config()
const mongoURL = 'mongodb+srv://tinthtooko:admin123@cluster0.xvb6je0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

app.use(express.json())
app.use(express.static('public'))
mongoose.connect(mongoURL).then(() =>{
    console.log('Db Connected!')
    app.listen(process.env.PORT,()=>{
        console.log('App is listen in '+ process.env.PORT);
    })
});

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))

app.use(cookieParser())
app.use('/api',AuthMiddleware,postRoute)
app.use('/user',userRoute)
app.use('/comment',commentRoute)