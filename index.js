const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000


app.use(express.json())


app.get('/', async (req, res) => {
    console.log('hit')
    
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })