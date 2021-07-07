const express = require('express');
const bookRouter = require('./routes/book');
const userRoutes=require('./routes/users');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(userRoutes)
app.use('/books', bookRouter);
app.use((error,req,res,next)=>{
    res.status(500).send("it does not exist")
})
app.use((req,res,next)=>{
    res.status(404).send("this url does not found")
})
app.listen(3000, () => console.log('listening to 3000...'));