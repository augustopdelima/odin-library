import { Book, Library } from "./library.js";
import presentation from "./presentation.js";
import createDocumentListener from "./handleInput.js";

function LibraryApp() {

    const library = new Library();

    const documentListener = createDocumentListener();
    documentListener.subscribe(handleCommand)

    const { addBookElementToDom, removeBookFromDom, renderBooks, updateSwitch } = presentation();

    function init() {
        renderBooks(library);
    }

    function openForm(command) {
        const form = document.getElementById('add-book-modal');
        form.showModal();
    }

    function closeForm(command) {
        const { target } = command;
        const addBookModal = target.closest('dialog');
        const formElement = target.closest('form');
        addBookModal.close();
        formElement.reset();
    }

    function handleFormSubmit(command) {
        const { target } = command;
        const formData = new FormData(target);

        const bookData = Object.fromEntries(formData.entries());

        addBookToLibrary(bookData, library);
        closeForm(command);
    }

    function handleDeleteBook(command) {
        const { target } = command;

        let parent = target.parentElement;
        while (!parent.classList.contains('book-card')) {
            parent = parent.parentElement;
        }

        const bookId = parent.getAttribute('id');

        library.removeBook(bookId);

        removeBookFromDom(parent);
    }

    function handleStatusBook(command) {
        const { target } = command;

        let parent = target.parentElement;
        while (!parent.classList.contains('book-card')) {
            parent = parent.parentElement;
        }

        const bookId = parent.getAttribute('id');

        library.updateBookStatus(bookId);
        const bookUpdated = library.getBook(bookId);

        const checkbox = target.previousElementSibling;

        if (checkbox && checkbox.type === 'checkbox') {
            updateSwitch(checkbox, bookUpdated)
        }

        const labelText = checkbox.previousElementSibling;

        if (labelText && labelText.classList.contains('switch-label')) {
            labelText.textContent = bookUpdated.read ? 'Read' : 'Not Read'
        }
    }

    function addBookToLibrary(bookData, library) {
        const { title, author, pages, image } = bookData;

        const bookWasRead = bookData.read === "yes";

        const book = new Book(title, author, pages, image, bookWasRead);

        library.addBook(book);
        addBookElementToDom(book);
    }

    function handleCommand(command) {
        const { identifier } = command;
    
        const validEventsTarget = {
            'add-book-btn': openForm,
            'cancel-form-button': closeForm,
            'create-book-form': handleFormSubmit,
            'delete-book': handleDeleteBook,
            'toggle-read-status':handleStatusBook,
        }

        const handleFunction = validEventsTarget[identifier];

        if (!handleFunction) return;

        handleFunction(command);
    }

    return { init }
}


const libraryApp = LibraryApp();
libraryApp.init();


