import { createBookCard } from "./bookComponents.js";


export default function presentation() {
    function renderBooks(library = new Library()) {

        const booksGallery = document.getElementById('books-g');


        const elements = library.books.map((book) => {
            return createBookCard(book);
        });


        elements.forEach((element) => {
            booksGallery.appendChild(element);
        });

    }

    function addBookElementToDom(book) {
        const booksGallery = document.getElementById('books-g');

        const bookCard = createBookCard(book);

        booksGallery.appendChild(bookCard);
    }

    function removeBookFromDom(book) {
        const booksGallery = document.getElementById('books-g');

        booksGallery.removeChild(book);
    }

    function updateSwitch(target, updateBookData) {
        target.checked = updateBookData.read;
    }


    return {
        renderBooks,
        removeBookFromDom,
        updateSwitch,
        addBookElementToDom,
    }
}
