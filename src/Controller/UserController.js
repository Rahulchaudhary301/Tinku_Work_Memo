
const UserData=require('../Model/model')

console.log(process.env.ACCOUNT)





const CreateData=async (req,res)=>{

    try {

        const Data = req.body;
        const {Shope_Name,Owener_Name,Worker_Name,Vehical_Name,Vehical_Model,Working_in_Vehicle,Payment,Labour_Charge}=Data

        if(!Payment && !Labour_Charge && !Owener_Name && !Worker_Name && !Vehical_Model && !Vehical_Name && !Working_in_Vehicle && !Shope_Name)  return res.status(400).send({status:false , msg:"All field is compulsary !!!"})
        if(!Shope_Name)  return res.status(400).send({status:false , msg:"Shope name is missing !!!"})
        if(!Worker_Name)  return res.status(400).send({status:false , msg:"Worker name is missing !!!"})
        if(!Vehical_Name)  return res.status(400).send({status:false , msg:"Vehical name is missing !!!"})
        if(!Vehical_Model)  return res.status(400).send({status:false , msg:"Vehicle Model is missing !!!"})
        if(!Owener_Name)  return res.status(400).send({status:false , msg:"Owener name is missing !!!"})
        if(!Payment)  return res.status(400).send({status:false , msg:"Payment is missing !!!"})
        if(!Working_in_Vehicle)  return res.status(400).send({status:false , msg:"Working in Vehicles is missing !!!"})
        if(!Labour_Charge)  return res.status(400).send({status:false , msg:"Labour Cahrge is missing !!!"})
         req.body.Dues_Payment=(Labour_Charge) - (Payment)

       
         const result = await UserData.create(Data)

    

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
        const b=Payment 
        if(a < Payment)  return res.status(400).send({ status: false, msg: "Amount is Greater then DuesAmount"  })
    
        req.body.Dues_Payment=a-b
        req.body.UpDated_Time=new Date().toLocaleTimeString()
        req.body.UpDated_Date= new Date().toLocaleDateString()

        const result = await UserData.findOneAndUpdate({_id:id},{$set:Data} ,{new:true})
         

       res.status(201).send({ status: false, data: result })

    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message })

    }

}




const getDATA=async (req,res)=>{

    try {
    
        const result = await UserData.find({isDeleted:false} )
        
        res.status(200).send({ status: false, data: result })

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





module.exports={CreateData , UpdateData ,getDATA}