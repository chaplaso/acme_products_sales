const express = require('express')
const app = express()
const PORT =  6090
const {SyncAndSeed, conn, Product} = require("./db")
const path = require('path')
const morgan = require('morgan')




//app.use(morgan())
app.use(express.json())

app.use( express.static("public"))


app.get("/test", (req, res, next)=>{
    res.send("Testing")
})

app.get("/product", (req, res, next)=>{
    Product.findAll().then((data)=>{
        res.send(data)
    })
    
})

app.put("/create", (req, res, next) => {
    req.body = req.params
    const data = req.body
    Product.create({...data})
    .then((success)=>{
        res.send(success)
    })
})

app.listen(PORT, console.log(`listening on PORT ${PORT}`))

SyncAndSeed()



//init()