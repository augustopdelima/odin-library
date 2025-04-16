
function Library() {
    this.books = [{
        title: 'Senhor dos Anéis: As duas Torres',
        author: 'Author: J.R.R Tolkien',
        pages: 457,
        image: 'https://m.media-amazon.com/images/I/81lQ5N0QwJL.jpg',
        read: false,
        id: crypto.randomUUID,
    }];

    this.addBook = function (book) {
        this.books.push(book);
    }

    this.removeBook = function (bookId) {
        const newBooks = this.books.filter((book) => book.id === bookId);
        this.books = newBooks;
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


function createBookInfoElement(book) {

    const { title, author, pages } = book;

    const bookInfo = document.createElement('div');
    bookInfo.className = 'book-info';

    const bookTitle = document.createElement('h3');
    bookTitle.className = 'book-title';
    bookTitle.textContent = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.className = 'book-author';
    bookAuthor.textContent = `Author: ${author}`;

    const bookPages = document.createElement('p');
    bookPages.className = 'book-pages';
    bookPages.textContent = `Pages: ${pages}`;

    bookInfo.appendChild(bookTitle);
    bookInfo.appendChild(bookAuthor);
    bookInfo.appendChild(bookPages);

    return bookInfo
}

function createBookActions(book) {

    const { id } = book;

    const bookActions = document.createElement('div');
    bookActions.className = 'book-actions';

    const deleteBook = document.createElement('button');
    deleteBook.className = 'delete-book';
    deleteBook.textContent = 'DELETE'
    deleteBook.id = id;

    const switchButton = createSwitchButton(book);

    bookActions.appendChild(deleteBook);
    bookActions.appendChild(switchButton);

    return bookActions;
}


function createSwitchButton(book) {

    const { read } = book;

    const switchWrapper = document.createElement('div');
    switchWrapper.className = 'switch-wrapper';

    const labelText = document.createElement('span');
    labelText.className = 'switch-label';
    labelText.textContent = 'Read';

    const checkboxId = crypto.randomUUID();

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = read;

    const label = document.createElement('label');
    label.setAttribute('for', checkbox);

    switchWrapper.appendChild(labelText);
    switchWrapper.appendChild(checkbox);
    switchWrapper.appendChild(label);

    return switchWrapper;
}


function createBookCard(book) {
    const bookCard = document.createElement('section');

    bookCard.className = 'book-card';

    const bookImage = document.createElement('img');
    bookImage.src = book.image;
    bookImage.className = 'book-image';

    const bookInfo = createBookInfoElement(book);

    const bookActions = createBookActions(book);


    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookInfo);
    bookCard.appendChild(bookActions);

    return bookCard;
}

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

const library = new Library();

function closeForm(formElement) {
    addBookModal.close();
    formElement.reset();
}

addBookButton.addEventListener('click', () => {
    addBookModal.showModal();
});

cancelFormButton.addEventListener('click',() => {
   
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



renderBooks(library);