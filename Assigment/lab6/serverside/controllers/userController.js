const User=require('../models/user');
const jwt= require('jsonwebtoken');
const key='@45rh_fki_op'
exports.login=(req,res,next)=>{
    console.log(req.body)
   const user=new  User(req.body.userName,req.body.password,null).login(); 
   if(user){
       const jwtToken=jwt.sign({userName:user.userName,role:user.role},key)
       res.json({jwtToken:jwtToken})
   } else{
       res.json({error:"invalid username and password"})
   } 
}
exports.authorize=(req,res,next)=>{
const token=req.headers.authorization;
  if(token){
    const jwtToken=token.split(' ')[1];
    // jwt.verify(jwtToken,key,(error,user)=>{
    //     console.log(user)//{ userName: 'ezra', role: 'member', iat: 1625525163 }
    //     if(error){
    //       res.status(403).json({error:"Forbidden"})
    //     }else{
    //      next()
    //     }
    // })
    try{
     const data=jwt.verify(jwtToken,key)
      req.user=data;
     console.log(data);
        next()
    }catch(error){
     res.status(403).json({error:"Forbidden"})
    }
  }else{
   res.status(401).json({error:"unauthorize"})
  }
}
exports.authorizeAdmin=(req,res,next)=>{
    if(req.user.role==="admin"){
        next()
    }else{
     res.status(401).json({error:"unauthorize"})  
    }
}