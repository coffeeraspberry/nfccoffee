const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
const Sequelize=require('sequelize')
const models= Sequelize.Model;
const sequelize= require('sequelize')
const db=require('./db')
const Role=require('./models/Role')
const User=require('./models/User')
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World, cutie PI!'))

//app.listen(port, () => console.log(`Local: http://localhost:${port}`))

db.sync().then(()=>{  
    Role.insert_default().then(()=>{

        User.insert_default().then(()=>{

            console.log(' Sync + Role_insert_Default')
        app.listen(port, () => console.log(`Local: http://localhost:${port}`))
        })

        
    })
})
   
app.get('/', (req, res) => res.send('Hello World, cutie PI!'))
    
app.get('/utilizator', async (req, res)=>{
        date=await Role.findAll()
        res.json(date)
    })