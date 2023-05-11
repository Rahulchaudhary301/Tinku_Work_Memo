
const dotenv=require('dotenv')
require('dotenv').config()
const express=require('express')
const app=express()
const {default: mongoose} =require('mongoose')
const router=require('./Router/Router')
const cors=require('cors')


const name=process.env.REACT_APP_NA
const password=process.env.REACT_APP_PA



app.use(express.json())

app.use(cors())


  mongoose.connect(`mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/Tinku_App?retryWrites=true&w=majority`)
   .then(()=>{
    console.log("MongoDB is connected")
   
})
.catch((err)=>console.log(err.message))



app.use("/",router)


app.listen(process.env.PORT ||9000 , function (){
    console.log("app is listen on 9000 PORT")
})


