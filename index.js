
const express= require('express')
require('dotenv').config()
const app= express()
const fs = require('fs')
const port= process.env.PORT

app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: false }))



app.listen(port,()=>{
    console.log(`The server is listening on PORT ${port}`);
})