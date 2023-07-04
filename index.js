const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const dbconnection = require('./database/connection')
const productRouter = require('./Routers/productRouter')
const ticketRouter = require('./Routers/ticketRouter')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

dbconnection()
const app = express()

app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))




app.use('/products', productRouter)
app.use('/tickets', ticketRouter)


app.listen(5000, () => {
    console.log('app listening at localhost 5000')
})
