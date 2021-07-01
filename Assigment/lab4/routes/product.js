const express=require('express');
const path=require('path')
// const options = {
//     "caseSensitive": false,
//     "strict": false
// };
const router = express.Router();
router.get('/add_product',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./','..','views','add_product.html'))
})
router.post('/add_product',(req,res,next)=>{
    res.send(JSON.parse(req.body))
})
module.exports = router;