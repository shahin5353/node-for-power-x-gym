const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true })

app.use(cors())
app.use(bodyParser.json())

app.post('/addClasses', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true })
    const classes = req.body
    client.connect(err => {
        const collection = client.db("power-x-gym").collection("classes")
        collection.insert(classes, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops)
            }
        })
        client.close()
    })
    
})

app.get('/classes', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true })
    client.connect(err =>{
        const collection = client.db("power-x-gym").collection("classes")
        collection.find().toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                res.send(documents)
            }
        })
        client.close()
    })
})

app.post('/addPricing', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true })
    const pricing = req.body
    client.connect(err => {
        const collection = client.db("power-x-gym").collection("pricing_plans")
        collection.insert(pricing, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops)
            }
        })
        client.close()
    })
    
})

app.get('/pricing-plans', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true })
    client.connect(err =>{
        const collection = client.db("power-x-gym").collection("pricing_plans")
        collection.find().toArray((err, documents) =>{
            if(err) {
                console.log(err);
                res.status(500).send({ message : err })                
            }
            else{
                res.send(documents)
            }
        })
        client.close()
    })
})

app.post('/addUser', (req,res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true })
    const user = req.body
    client.connect(err => {
        const collection = client.db("power-x-gym").collection("users")
        collection.insertOne(user, ( err, result ) =>{
            if(err){
                console.log(err);
                res.status(500).send({message : err})
            }
            else {
                res.send(result.ops[0])
            }
        })
        client.close()
    })
    
})

const port = process.env.PORT || 4040
app.listen(port, () => console.log(`Listening from port ${port}`))