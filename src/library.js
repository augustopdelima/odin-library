class Library {
  constructor() {
    this.books = [
      {
        title: "Senhor dos Anéis: As duas Torres",
        author: "Author: J.R.R Tolkien",
        pages: 457,
        image: "https://m.media-amazon.com/images/I/81lQ5N0QwJL.jpg",
        read: false,
        id: crypto.randomUUID(),
      },
    ];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
  }

  updateBookStatus(bookId) {
    this.books = this.books.map((book) => {
      if (book.id === bookId) {
        book.read = !book.read;
      }
      return book;
    });
  }

  getBook(bookId) {
    return this.books.find((book) => book.id === bookId);
  }

  get getBooks() {
    return this.books;
  }

  set setBooks(books) {
    this.books = books;
  }
}

class Book {
  constructor(title, author, pages, image, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.image = image;
    this.read = read;
    this.id = crypto.randomUUID();
  }
}

export { Library, Book };
