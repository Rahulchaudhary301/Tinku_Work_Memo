const jwt=require('jsonwebtoken')

const UserModel=require('../Model/model')

//const PostModel=require('../Model/postModel')


//________________________________________Authentication_______________________________________________________________

const authenticate = (req, res, next) => {
    try{
          let token = req.body.token || req.headers.token

         
           
          if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

          jwt.verify(token, "Rahul", function (err, decode) {
          if (err) { return res.status(401).send({ status: false, data: "Authentication failed" }) }
          req.decode = decode;
          return  next();
         
      })

    }
          catch (error) {
          res.status(500).send({ staus: false, msg: error.message });
    }
}


//______________________________________________Authorization______________________________________________________________

const authorize= async function ( req, res, next) {
    try{
          let userId= req.params.userId || req.headers.userid || req.body.id
         // console.log(req.decode)
          

          let gettingUserId= await UserModel.findOne({_id:userId})

            
          if(!gettingUserId) return res.status(400).send({ status: false, msg: "Post Id Is not correct " });
 
          let UserId= gettingUserId.userId.toString()
          console.log(UserId)
          
          if (UserId  == req.decode.userId || req.body.userId  == req.decode.userId  ) return next();
          else return res.status(403).send({ status: false, msg: "you are not authorised to perform this task !!!" });

    }
          catch(error){
          return res.status(500).send({msg: error.message})
    }
  }






module.exports={authenticate ,authorize}