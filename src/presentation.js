import { createBookCard } from "./bookComponents.js";


export default function createPresentation(library) {
    function renderBooks(command) {

        const { target } = command;


        const elements = library.books.map((book) => {
            return createBookCard(book);
        });


        elements.forEach((element) => {
            target.appendChild(element);
        });

    }

    function addBookElementToDom(command) {

        const { parent, bookData } = command;

        const bookCard = createBookCard(bookData);

       parent.appendChild(bookCard);
    }

    function removeBookFromDom(command) {
        const { parent, bookElement } = command;

        parent.removeChild(bookElement);
    }

    function updateBookSwitch(command) {

        const { checkbox, label } = command;

        const newCheckboxStatus = !checkbox.checked;
        checkbox.checked = newCheckboxStatus;

        label.textContent = newCheckboxStatus ? 'Read' : 'Not Read';


    }

    function openForm(command) {
        const { target } = command;

        target.showModal();
    }
    
    function closeForm(command) {
        const { target } = command
        
        target.close();
    }

    function handleCommand(command) {
        const { identifier } = command;

        const validRenderActions = {
            'render-books': renderBooks,
            'add-book': addBookElementToDom,
            'remove-book': removeBookFromDom,
            'update-switch': updateBookSwitch,
            'open-form':openForm,
            'close-form': closeForm,
        }

        const handleFunction = validRenderActions[identifier];

        if (!handleFunction) return;

        handleFunction(command);
    }

    return {
        handleCommand,
    }
}
