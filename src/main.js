import Library from "./library.js";
import Book from "./book.js";
import { renderBooks, addBookElementToDom, removeBookFromDom, updateSwitch } from "./render.js";

function addBookToLibrary(bookData, library) {
    const { title, author, pages, image } = bookData;

    const bookWasRead = bookData.read === "yes";

    const book = new Book(title, author, pages, image, bookWasRead);

    library.addBook(book);
    addBookElementToDom(book);
}

function deleteBook(target) {
    let parent = target.parentElement;
    while (!parent.classList.contains('book-card')) {
        parent = parent.parentElement;
    }

    const bookId = parent.getAttribute('id');

    library.removeBook(bookId);



    removeBookFromDom(parent);
}

function updateStatus(target) {
    let parent = target.parentElement;
    while(!parent.classList.contains('book-card')) {
        parent = parent.parentElement;
    } 

    const bookId = parent.getAttribute('id');

    library.updateBookStatus(bookId);
    const bookUpdated = library.getBook(bookId);

    const checkbox = target.previousElementSibling;

    if(checkbox && checkbox.type === 'checkbox') {
        updateSwitch(checkbox,bookUpdated)
    }
    
    const labelText = checkbox.previousElementSibling;

    if(labelText && labelText.classList.contains('switch-label')) {
        labelText.textContent = bookUpdated.read ? 'Read' : 'Not Read'
    }
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

    if (!(target instanceof HTMLElement)) return;

    if (target.classList.contains('delete-book')) {
        deleteBook(target);
    }


    if (!!target.getAttribute('checkbox-label-read-book')) {
        updateStatus(target);
    }


});


renderBooks(library);