const Product = require('../../../../labExc/cs477-mainP/lesson05/models/product');
const Book=require('../models/book')
exports.getAllBook=(req,res,next)=>{
  Book.findAll().then(books=>{
    console.log(books)
    res.status(200).json(books)
  }).
  catch(err=>{
    console.log(err)
  });
   
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
  Book.findById(req.params.id).
  then(book=>{
    res.status(200).json(book)
  }).
  catch(err=>{
    console.log(err)
  })
    //res.status(200).json(Book.findById(req.params.id)); 
}
