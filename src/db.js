import { Book } from "./library.js";

export default function createDb(Library) {


    function saveBooks() {

        const books = JSON.parse(libraryBooks).map(book => 
            new Book(book.title, book.author, book.pages, book.image, book.read)
        );

        Library.setBooks(books); 
    }

    function loadBooks() {

        const libraryBooks = localStorage.getItem('library');

        if(!libraryBooks) return;

        const books = JSON.parse(libraryBooks);

        Library.setBooks(books);

    }

    function handleAddBook (command) {
        const { bookData } = command;
        const { title, author, pages, image } = bookData;
        const read = bookData.read ? true : false;

        const newBook = new Book(title, author, pages, image, read);

        Library.addBook(newBook);
        saveBooks();
    }

    function handleRemoveBook (command) {
        const { bookId } = command;

        Library.removeBook(bookId);
        saveBooks();
    }

    function handleStatusBook (command) {
        const { bookId } = command;

        Library.updateBookStatus(bookId);
        saveBooks();
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