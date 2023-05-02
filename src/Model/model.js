const mongoose=require('mongoose')

const UserData= new mongoose.Schema({
  Shope_Name:{
    type:String,
    trim:true
  },
      Owener_Name:{
        type:String,
        trim:true
      },
      Worker_Name:{
        type:String,
        trim:true
      },
      Vehical_Name:{
        type:String,
        trim:true
      },
      Vehical_Model:{
        type:String,
        trim:true
      }, 
      Working_in_Vehicle:{
        type:String,
        trim:true
      },
      Labour_Charge:{
        type:Number,
        trim:true
      },
      Payment:{
        type:Number,
        trim:true
      },
     Total_Payment:{
        type:Number,
        trim:true
      },

      Dues_Payment:{
        type:Number,
        trim:true
      },
      isDeleted:{
        type:Boolean,
        default:false
      }
      ,
      Date:{
        type:String,
        default: new Date().toLocaleDateString()
      },
      Time:{
        type:String,
        default: new Date().toLocaleTimeString()
      },
      UpDated_Time:{
        type:String,
        default:null
      },
      UpDated_Date:{
        type:String,
        default:null
      },
   

},{timestamps:true})


module.exports= mongoose.model('tinku_Data',UserData)