const userModel=require('../Model/UserModel')
const jwt =require('jsonwebtoken')


const userCrete=async(req,res)=>{

    try {
        
         const user=req.body;
         const {name,email,password,mobile}=user

         if(!name && !email && !password && !mobile) return   res.status(400).send({ status: false, msg: "All field is require" })
         
         const isEmail= await userModel.findOne({email:email})
         if(isEmail) return   res.status(400).send({ status: false, msg: "this Email is already in Use" })

        const data =await userModel.create(user)
        res.status(201).send({ status: true, data: data })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




const UserLogin= async(req,res)=>{
      
    try{
         const data=req.body;

         const {email,password}=data
         if(!email && !password)  return res.status(400).send({status:false,msg:"All field is required"})
     
         if(!email) return res.status(400).send({status:false,msg:"email is required"})
        if(!password) return res.status(400).send({status:false,msg:"password is required"})

        const IsEmail = await userModel.findOne({email:email})
        if(!IsEmail) return res.status(400).send({status:false,msg:"THis email is not exist on DataBase"})
        if(IsEmail.password !==data.password) return res.status(400).send({status:false,msg:"Wrong PassWord"})

        const token=jwt.sign({userId: IsEmail._id},'Rahul')
        res.status(201).send({status:true, token:token ,userId:IsEmail._id})

    }
 catch(err){
     res.status(500).send({status:false, msg:err.message})
 }



}




module.exports={UserLogin,userCrete}