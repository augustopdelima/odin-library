import { Book, Library } from "./library.js";


export default function createDb(library) {


    function saveBooks() {
        const books = library.getBooks;
        const jsonBooks = JSON.stringify(books)
        localStorage.setItem('library', jsonBooks);
    }

    function loadBooks() {

        const libraryBooks = localStorage.getItem('library');

        if(!libraryBooks) return;

        const books = JSON.parse(libraryBooks).map(book => 
            new Book(book.title, book.author, book.pages, book.image, book.read)
        );


        library.setBooks = books;
    }

    function handleAddBook (command) {
        const { bookData } = command;
        const { title, author, pages, image } = bookData;
        const read = bookData.read ? true : false;

        const newBook = new Book(title, author, pages, image, read);

        library.addBook(newBook);
    }

    function handleRemoveBook (command) {
        const { bookId } = command;

        library.removeBook(bookId);
        saveBooks(library);
    }

    function handleStatusBook (command) {
        const { bookId } = command;

        library.updateBookStatus(bookId);
        saveBooks(library);
    }

    function handleCommand (command) {
        const { identifier } = command;

        const validLibraryEvents = {
            'add-book': handleAddBook,
            'remove-book': handleRemoveBook,
            'update-status-book': handleStatusBook,
        }

        const handleFunction = validLibraryEvents[identifier];

        if (!handleFunction) return;

        handleFunction(command);
    }

    return { handleCommand, loadBooks }
}