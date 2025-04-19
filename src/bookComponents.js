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

    const bookActions = document.createElement('div');
    bookActions.className = 'book-actions';

    const deleteBook = document.createElement('button');
    deleteBook.className = 'delete-book';
    deleteBook.textContent = 'DELETE';
    deleteBook.setAttribute('data-command', 'delete-book');

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
    labelText.textContent = read ? 'Read' : 'Not Read';

    const checkboxId = crypto.randomUUID();

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.checked = read;

    const label = document.createElement('label');
    label.setAttribute('for', checkbox);
    label.setAttribute('data-command', 'toggle-read-status');

    switchWrapper.appendChild(labelText);
    switchWrapper.appendChild(checkbox);
    switchWrapper.appendChild(label);

    return switchWrapper;
}


function createBookCard(book) {

    const { id } = book;

    const bookCard = document.createElement('section');

    bookCard.className = 'book-card';
    bookCard.id = id;

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

export { createBookCard, createSwitchButton, createBookActions, createBookInfoElement };