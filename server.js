const express = require('express')
const dotenv = require('dotenv')
const path = require('path')


//import colors package

const colors = require('colors')

// import cookie parser
const CookieParser = require('cookie-parser')

//import mongoDB file

const connectDB = require('./config/db')

//import Routes file

const bootcamps = require('./routes/bootcamps')

//import courses routes file

const course = require('./routes/course')

//import users routes file

const users = require('./routes/users')

//import reviews routes file

const reviews = require('./routes/reviews')

//import morgan package

const morgan = require('morgan')

const errorHandler = require('./middleware/Error')

//import auth from routes folder

const auth = require('./routes/auth')
//import auth from routes folder

// const auth = require('./routes/auth')

const fileupload= require('express-fileupload')


//import mongosanitize 

const mongoSanitize = require('express-mongo-sanitize');

//import helmet

const helmet = require('helmet');

//import xss-clean

var xss = require('xss-clean')

const rateLimit = require('express-rate-limit');

const hpp = require('hpp');

const cors = require('cors')




//load env config file

dotenv.config({path: './config/config.env'})

// Connect MongoDB

connectDB()

const app = express()

//set static folder
app.use(express.static(path.join(__dirname,'public')))

//Connect Postman with our backend (body-parser)

app.use(express.json())

app.use(CookieParser())


// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 1
 });
 app.use(limiter);

 
// Prevent http param pollution
app.use(hpp());

app.use(cors())


//Dev logging middleware

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(fileupload())
// use bootcamp routes

app.use('/api/v1/bootcamps', bootcamps)

// use course routes

app.use('/api/v1/courses', course)

// use users routes

app.use('/api/v1/users', users)

// use reviews routes

app.use('/api/v1/reviews', reviews)






// Import auth.js in server.js
app.use('/api/v1/auth', auth);


app.use(errorHandler)


//use mongosanitize

app.use(mongoSanitize());


//  set security header
app.use(helmet());

// prevent xss attacks
app.use(xss())




//define port

const PORT = process.env.PORT || 6000

const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
})

//handle unhandle promise rejection

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red.bold)

    //close server & exit process

    server.close(() => process.exit(1))
})