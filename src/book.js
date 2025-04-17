
function Book(title, author, pages, image, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.image = image;
    this.read = read;
    this.id = crypto.randomUUID();
}

export default Book;