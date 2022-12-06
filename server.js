require('dotenv').config()
const express = require('express');
const app = express()
const mongoose = require('mongoose')

const User = require('./models')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.log(err));
db.once('open', () => console.log(" Mongo server has started"));

app.use(express.json())

//  Getting ALL
app.get('/user', async (req, res)=> {
    try{
    const user = await User.find()
    res.json(user)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Creating one
app.post('/user', async (req, res) => {
    
 const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
})
try{
const newUser = await user.save()
res.status(201).json(newUser)
}catch(err){
res.status(400).json({ message: res.err})
}


   
})


/* 
 User.find({ username: req.body.username }).then((user)=> {
        if(user){
            res.send('user', user)
        }else{
            const user = new User({
                username: req.body.username,
                password: req.body.password,
                email:req.body.password
            }).save()
        }
    }).catch((err)=> res.status(500).send('error'))
    
*/

//  Getting One
app.get('/user/:id', (req, res) => {
    User.find({_id: req.params.id}).then((user)=>{
        if( user ){
            res.send(`${user} exists11`)
        }else{
            res.send(`${user} does not exists`)
        }
    }).catch(err => {
        res.json({message: err.message})
    })


})

// Updating one
app.patch('/user/:id', (req, res) => {

})

// Deleting One 
app.delete('/user/:id', (req, res) => {

})


app.listen(3000, () => console.log('Express server has started'));

