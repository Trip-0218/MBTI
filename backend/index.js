const connectToMongo = require('./db');
const express = require('express')
var cors = require("cors")

connectToMongo();


const app = express()
app.use(cors())

const port = 8080

app.use(express.json())

//available routes
app.use('/api/auth', require("./routes/auth"))
app.use('/api/questions', require("./routes/questions"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



