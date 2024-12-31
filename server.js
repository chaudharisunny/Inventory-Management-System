const express = require('express')
const app = express()
const port = 3000
const indexRoutes=require('./routes/index')
const cookieParser=require('cookie-parser')
const db=require('./models/db')

app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => res.send('inventory'))
app.use('/api/v1/',indexRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))