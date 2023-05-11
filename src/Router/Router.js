const express =require('express')
const Router=express.Router()
const UserData=require('../Controller/UserController')
const user=require('../Controller/user')
const middileware=require('../MiddileWhere/middileware')


Router.get('/bc',(req,res)=>{
    res.send({status:true, msg: "Successfully"})
})

Router.post('/createData', UserData.CreateData)

Router.put('/update', middileware.authenticate, middileware.authorize, UserData.UpdateData)

Router.get('/getData', UserData.getDATA)

Router.get('/getUser', UserData.getUserData)

Router.post('/signup',user.userCrete)

Router.post('/login',user.UserLogin)

Router.delete('/deletePost', middileware.authenticate, middileware.authorize, UserData.Delete_post)


module.exports = Router