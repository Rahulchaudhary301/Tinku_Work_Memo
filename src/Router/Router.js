const express =require('express')
const Router=express.Router()
const UserData=require('../Controller/UserController')



Router.get('/bc',(req,res)=>{
    res.send({status:true, msg: "Successfully"})
})

Router.post('/createData', UserData.CreateData)

Router.put('/update', UserData.UpdateData)

Router.get('/getData', UserData.getDATA)


module.exports = Router