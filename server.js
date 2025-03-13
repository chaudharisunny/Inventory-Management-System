const express = require('express')
const app = express()
const port = 3000
const indexRoutes=require('./routes/index')
const cookieParser=require('cookie-parser')
const connectDB=require('./models/db')

//connect database
connectDB()

//middleware
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => res.send('inventory'))

//main routes
app.use('/api/v1/',indexRoutes)

//server connect
app.listen(port, () => console.log(`Example app listening on port ${port}!`))