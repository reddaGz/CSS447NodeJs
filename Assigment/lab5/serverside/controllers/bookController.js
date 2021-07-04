const Product = require('../../../../labExc/cs477-mainP/lesson05/models/product');
const Book=require('../models/book')
exports.getAllBook=(req,res,next)=>{
   res.status(200).json(Book.findAll())
}
exports.save=(req,res,next)=>{
  const book=req.body;
  //console.log(book)
  const newBook=new Book(null,book.title,book.ISBN,book.publishDate,book.author).save() 
  res.status(201).json(newBook); 
}
exports.update=(req,res,next)=>{
  const id=parseInt(req.params.id);
  const book=req.body;
  const updateBook=new Book(id,book.title,book.ISBN,book.publishDate,book.author).update()
  res.status(200).json(updateBook) 
}
exports.delete=(req,res,next)=>{
  const id =parseInt(req.params.id); 
  let deletedBook=Book.deleteById(id)
  res.status(200).json(deletedBook)
}
exports.getById=(req,res,next)=>{
    res.status(200).json(Book.findById(req.params.id)); 
}
