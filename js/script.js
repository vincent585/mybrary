const myLibrary = [];

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pageCount} pages, ${this.read === true ? "read it" : "not read yet"}.`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function seedLibrary() {
  for (let index = 0; index < 10; index++) {
    let book = new Book(`Test Book ${index + 1}`, "Test Author", 100, index % 2 === 0);

    addBookToLibrary(book);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  seedLibrary();
});