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
    this.id = baseId+books.length;//Math.floor(Math.random() * 1000) + books.length;
    books.push(this);
    return this;
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
    return books;
  }
  static findById(id) {
    const book = books.find((b) => b.id === parseInt(id));
    if (book !== undefined) return book;
    throw Error("not found");
  }
};
