import Library from "./library.js";
import Book from "./book.js";
import { renderBooks, addBookElementToDom, removeBookFromDom } from "./render.js";

function addBookToLibrary(bookData, library) {
    const { title, author, pages, image } = bookData;

    const bookWasRead = !!bookData.read;

    const book = new Book(title, author, pages, image, bookWasRead);

    library.addBook(book);
    addBookElementToDom(book);
}


const addBookButton = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const cancelFormButton = document.getElementById('cancel-form-button');
const formAddBook = document.getElementById('create-book-form');
const booksGallery = document.getElementById('books-g');

const library = new Library();

function closeForm(formElement) {
    addBookModal.close();
    formElement.reset();
}

addBookButton.addEventListener('click', () => {
    addBookModal.showModal();
});

cancelFormButton.addEventListener('click', () => {

    closeForm(formAddBook);
});

formAddBook.addEventListener('submit', (event) => {
    event.preventDefault();

    const formEvent = event.target;
    const formData = new FormData(formEvent);

    const bookData = Object.fromEntries(formData.entries());

    addBookToLibrary(bookData, library);

    closeForm(formAddBook);
});


booksGallery.addEventListener('click', (event) => {
    const { target } = event;
    
    if(!(target instanceof HTMLElement)) return;

    if(!target.classList.contains('delete-book')) return;

    const bookId = target.getAttribute('id');
    
    library.removeBook(bookId);

    let parent = target.parentElement;
    while(!parent.classList.contains('book-card')) {
        parent = parent.parentElement;
    }

    removeBookFromDom(parent);
});


renderBooks(library);