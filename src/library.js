function Library() {
    this.books = [{
        title: 'Senhor dos Anéis: As duas Torres',
        author: 'Author: J.R.R Tolkien',
        pages: 457,
        image: 'https://m.media-amazon.com/images/I/81lQ5N0QwJL.jpg',
        read: false,
        id: crypto.randomUUID(),
    }];

    this.addBook = function (book) {
        this.books.push(book);
    }

    this.removeBook = function (bookId) {
        const newBooks = this.books.filter((book) => book.id !== bookId);

        this.books = newBooks;
    }

    this.updateBookStatus = function (bookId) {
        const newBooks = this.books.map((book) => {
            if (book.id === bookId) {
                book.read = !book.read;
            }

            return book
        })

        this.books = newBooks;
    }

    this.getBook = function (bookId) {
        const book = this.books.find((book) => book.id === bookId);
        return book;
    }

    this.getBooks = function () {
        return this.books;
    }

    this.setBooks = function(books) {
        this.books = books;
    }
}

function Book(title, author, pages, image, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.image = image;
    this.read = read;
    this.id = crypto.randomUUID();
}

export { Library, Book };