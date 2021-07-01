const express=require('express');
const path=require('path')
const router = express.Router();
router.get('/user',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'..','views','user.html'))   
})
router.post('/user',(req,res,next)=>{
    //res.send(JSON.parse(req.body)) this is error
    res.send(req.body)
})
module.exports = router;