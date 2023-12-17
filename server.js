require('dotenv').config()
const express = require('express')

const app = express()
const path = require('path')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const { logger } = require('./middleware/logger')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const {logEvents}=require('./middleware/logger')
const PORT = process.env.PORT || 3500
const http = require('http');
const server = http.createServer(app);
const socket = require('./config/socket'); 
socket.init(server); // Khởi tạo Socket.IO và lắng nghe kết nối

mongoose.set('strictQuery', false)
connectDB()
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname,'/public')))
app.use('/', require('./routes/root'))
app.use('/auth',require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/products', require('./routes/products'))
app.use('/order', require('./routes/orderRoutes'))
app.use('/messageData', require('./routes/notiRoutes'))
app.use('/workshift', require('./routes/workShift'))
app.use('/like', require('./routes/likeRoutes'))
app.all('*',(req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})