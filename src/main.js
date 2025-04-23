import { Library } from "./library.js";
import createPresentation from "./presentation.js";
import createDb from "./db.js";
import createDocumentListener from "./handleInput.js";

function createApp() {

    const state = {
        observers:[],
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }
 

    function notifyAll(command) {
        for (const observersFunction of state.observers) {
            observersFunction(command);
        }
    }

    function init() {

        const command = {
            identifier:'render-books',
            target: document.getElementById('books-g'),
        }

        notifyAll(command);
    }

    function openForm(command) {

        const newCommand = {
            identifier:'open-form',
            target: document.getElementById('add-book-modal'),
            origin:command.target,
        }

        notifyAll(newCommand);

    }

    function closeForm(command) {

        const bookModal = document.getElementById('add-book-modal');
        const formElement = document.getElementById('create-book-form');

        const newCommand = {
            identifier:'close-form',
            target:bookModal,
            origin:command,
        }

        notifyAll(newCommand);

        if(formElement) formElement.reset();
    }

    function handleFormSubmit(command) {
        const { target } = command;
        const formData = new FormData(target);

        const bookData = Object.fromEntries(formData.entries());


        const newCommand = {
            identifier:'add-book',
            bookData,
            parent: document.getElementById('books-g'),
            origin:command
        }

        notifyAll(newCommand);


        closeForm(command);
    }

    function getBookElement(child) {
        let parent = child.parentElement;
        
        while (parent && !parent.classList.contains('book-card')) {
            parent = parent.parentElement;
        }

        return parent;
    }

    function handleDeleteBook(command) {
        const { target } = command;

        const bookElement = getBookElement(target);
        const bookId = bookElement.getAttribute('id');

        const newCommand = {
            identifier:'remove-book',
            bookId,
            parent: document.getElementById('books-g'),
            bookElement,
            origin:command,
        }

        notifyAll(newCommand);
    }

    function handleStatusBook(command) {
        const { target } = command;

        const bookElement = getBookElement(target);
        const bookId = bookElement.getAttribute('id');

        
        const updateLibraryCommand = {
            identifier:'update-status-book',
            bookId,
            origin: command,
        }

        notifyAll(updateLibraryCommand);

        const switchWrapper = target.closest('.switch-wrapper');
        const checkbox = switchWrapper.querySelector('input[type="checkbox"]');
        const label = switchWrapper.querySelector('.switch-label');

        const updateDomCommand = {
            identifier:'update-switch',
            checkbox,
            label,
            origin:command,
        }

        notifyAll(updateDomCommand);
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

    return { init, subscribe, handleCommand }
}

const library = new Library();

const presentationLayer = createPresentation(library);
const dbLayer = createDb(library);
dbLayer.loadBooks();

const app = createApp();

const documentListener = createDocumentListener();
documentListener.subscribe(app.handleCommand)

app.subscribe(presentationLayer.handleCommand);
app.subscribe(dbLayer.handleCommand);
app.init();