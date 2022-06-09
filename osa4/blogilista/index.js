
const app = require('./app') 
const http = require('http')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const config = require('./utils/config')


app.use(cors())
app.use(express.json())


app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})