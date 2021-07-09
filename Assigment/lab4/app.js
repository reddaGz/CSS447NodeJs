const { urlencoded } = require('express')
const express=require('express')
const path=require('path')
const product=require('./routes/product')
const user=require('./routes/user')
const error=require('./routes/error')
const app=express()
app.use(express.urlencoded({extended:true}))
app.use('/resource/user',express.static(path.join(__dirname, 'public','css')));
app.use(product);
app.use(user);
app.use(error);

app.use((err, req, res, next)=> { 
    res.status(500).sendFile(path.join(__dirname,'./','views','505.html'))
});

app.use((req, res, next) => { 
    res.status(404).sendFile(path.join(__dirname,'./','views','404.html'))
})
app.listen(3000,()=>{
     console.log(`this listinig ${3000}`)
 })

 /**
 Create a npm project and install Express.js (Nodemon if you want)
Change your Express.js app which serves HTML files (of your choice with your content) for “/”, “/users” and “/products”.
For “/users” and “/products”, provides GET and POST requests handling (of your choice with your content) in different routers.
Add some static (.js or .css) files to your project that should be required by at least one of your HTML files.
Customize your 404 page
Provide your own error handling
  */