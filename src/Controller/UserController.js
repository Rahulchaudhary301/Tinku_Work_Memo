
const UserData=require('../Model/model')

const Auth=process.env.REACT_APP_AUT

const ACC=process.env.REACT_APP_ACC





const CreateData=async (req,res)=>{

    try {

        

        const Data = req.body;
        const {Shope_Name,Owener_Name,Worker_Name,Vehical_Name,Vehical_Model,Working_in_Vehicle,Payment,Labour_Charge}=Data

        if( !Labour_Charge && !Owener_Name && !Worker_Name && !Vehical_Model && !Vehical_Name && !Working_in_Vehicle && !Shope_Name)  return res.status(400).send({status:false , msg:"All field is compulsary !!!"})
        if(!Shope_Name)  return res.status(400).send({status:false , msg:"Shope name is missing !!!"})
        req.body.Shope_Name = Shope_Name.toUpperCase();
        if(!Worker_Name)  return res.status(400).send({status:false , msg:"Worker name is missing !!!"})
        if(!Vehical_Name)  return res.status(400).send({status:false , msg:"Vehical name is missing !!!"})
        if(!Vehical_Model)  return res.status(400).send({status:false , msg:"Vehicle Model is missing !!!"})
        if(!Owener_Name)  return res.status(400).send({status:false , msg:"Owener name is missing !!!"})
       // if(!Payment)  return res.status(400).send({status:false , msg:"Payment is missing !!!"})
        if(!Working_in_Vehicle)  return res.status(400).send({status:false , msg:"Working in Vehicles is missing !!!"})
        if(!Labour_Charge)  return res.status(400).send({status:false , msg:"Labour Cahrge is missing !!!"})
         console.log(Labour_Charge,Payment)

      //  if(Labour_Charge >  Payment) return res.status(400).send({status:false , msg:"ohh ohh you put Extra payment then labour charge !!!"})
        
         req.body.Total_Payment=Payment

         req.body.Dues_Payment=(Labour_Charge) - (req.body.Total_Payment)
         
       
         const result = await UserData.create(Data)

    //Whatup featurs 

    //      const accountSid = ACC;
    //      const authToken = Auth;
    //       const client = require('twilio')(accountSid, authToken);
  
    //    client.messages
    //   .create({
    //       body: 
    //       `New Data Create successfully of shope => ${Shope_Name} ,
  
    //     Data : ${result.toString()}`,
    //       from: 'whatsapp:+14155238886',
    //       to: 'whatsapp:+919852675983'
    //   })
    //   .then(message => console.log(message.sid))

  res.status(201).send({ status: false, data: result })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




const UpdateData=async (req,res)=>{

    try {
        
        const Data = req.body;
        const {id,Payment} =Data
        if(!id) return res.status(400).send({ status: false, msg: "Please Enter Id"})
        if(isNaN(Payment))   return res.status(400).send({ status: false, msg: "Please Enter Number not String"})
         if(!Payment) return res.status(400).send({ status: false, msg: "Please Enter Amount"})
        const x= await UserData.findById(id)
        if(x.length==0) return res.status(400).send({ status: false, msg: "Please Enter valid ID Amount"})
        const a= x.Dues_Payment
        if(a < Payment)  return res.status(400).send({ status: false, msg: "Amount is Greater then DuesAmount"  })
        const t=x.Total_Payment
        req.body.Total_Payment=parseInt(t)+parseInt(Payment)
        
        req.body.Dues_Payment=a-Payment
       
        req.body.UpDated_Time=new Date().toLocaleTimeString()
        req.body.UpDated_Date= new Date().toLocaleDateString()

        const result = await UserData.findOneAndUpdate({_id:id},{$set:Data} ,{new:true})
         

    //     //Whatup featurs

    //    const accountSid = ACC;
    //    const authToken = Auth;
    //     const client = require('twilio')(accountSid, authToken);

    //  client.messages
    // .create({
    //     body: 
    //     `Payment is apdated successfully Rs ${Payment} ,

    //    Data : ${result.toString()}`,
    //     from: 'whatsapp:+14155238886',
    //     to: 'whatsapp:+919852675983'
    // })
    // .then(message => console.log(message.sid))
    // //.done();



    res.status(201).send({ status: false, data: result })

    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}






const getDATA=async (req,res)=>{

    try {

    
        const result = await UserData.find({isDeleted:false}).sort({ Dues_Payment:-1})
        
        res.status(200).send({ status: false, data: result })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}



const getUserData=async (req,res)=>{

    try {

        const userId=req.headers.userid;

        console.log(userId)

        const result = await UserData.find({$and:[{userId:userId},{isDeleted:false}]}).sort({ Dues_Payment:-1})
        
        res.status(200).send({ status: false, data: result })


    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}



const Delete_post = async (req, res) => {

    try {


        
        const postId=req.params.postId || req.headers.userid

        

        const isId= await UserData.findOne({_id:postId})
        
        if(isId== null) return res.status(404).send({status:false, msg:" Post is not correct "})
    
       
        let Postdata = await UserData.find({_id:postId , isDeleted:false})

        if(Postdata.length==0) return res.status(404).send({status:false, msg:"your request is not correct, Post is already deleted"})

        let t1=Date.now()

        let updateBooksData= await UserData.findOneAndUpdate({_id:postId},{$set:{isDeleted:true,deletedAt:t1}},{new:true}) 

        res.status(200).send({status:true, msg:"deleted successfully"})


    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }




}
















// const UpdateDataById=async (req,res)=>{

//     try {
//         const Data = req.body;
        
//         const x= await UserData.findById(id)
//         const a= x.Dues_Payment
//         const b=Payment
    
//         req.body.Dues_Payment=a-b
//         req.body.UpDated_Time=new Date().toLocaleTimeString()
//         req.body.UpDated_Date= new Date().toLocaleDateString()

//         const result = await UserData.findOneAndUpdate({_id:id},{$set:Data } ,{new:true})
         
//         res.status(201).send({ status: false, data: result })

//     }

//     catch (err) {

//         res.status(500).send({ status: false, msg: err.message })

//     }

// }





module.exports={CreateData , UpdateData ,getDATA ,getUserData ,Delete_post}