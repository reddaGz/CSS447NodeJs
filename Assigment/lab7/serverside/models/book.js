const getDB=require('../util/database').getDB;
const baseId=1234;
const books = [
  {
    id:1234,
    title:"Introduction to java scripts",
    ISBN:"IJ2341",
    publishDate:"02/12/2011",
    author:"Redda Gebre"
  }
];
//id,title,ISBN,publishDate,author
module.exports = class Book {
  constructor(id, title, ISBN, publishDate, author) {
    this.id = id;
    this.title = title;
    this.ISBN = ISBN;
    this.publishDate = publishDate;
    this.author = author;
  }
  save() {
    this.id = baseId+1;//Math.floor(Math.random() * 1000) + books.length;
    // books.push(this);
    // return this;
    const db=getDB();
    db.collection('books').insertOne(this)
    .then(data=>{
      console.log(data.result)
    }).catch(err=>console.log(err))
  }
  update() {
    console.log(this.id)
    const index = books.findIndex((b) => b.id === this.id);
    if (index !== -1) {
      books.splice(index, 1, this);
      return this;
    }
    throw Error("it does not exist");
  }
  static deleteById(id) {
    const index = books.findIndex((b) => b.id ===id);
    if (index !== -1) {
      const deletedBook = books[index];
      books.splice(index, 1);
      return deletedBook;
    }
    throw Error("it does not exist");
  }
  static findAll() {
    const db=getDB();
  return  db.collection('books').find().toArray()
  }
  static findById(bookId) {
    bookId=parseInt(bookId);
    const db=getDB();
    return db.collection('books').findOne({
      id:bookId
    })
    // const book = books.find((b) => b.id === parseInt(id));
    // if (book !== undefined) return book;
    // throw Error("not found");
  }
};
