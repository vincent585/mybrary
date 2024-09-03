const myLibrary = [];
const libraryContainer = document.querySelector(".library-container");
const showFormBtn = document.querySelector("#showForm");
const cancelBtn = document.querySelector("#cancel");
const dialogModal = document.querySelector("dialog");
const addBtn = document.querySelector("#addBook");

window.addEventListener("load", () => {
  seedLibrary();
  showLibrary();
});

showFormBtn.addEventListener("click", () => {
  dialogModal.showModal();
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();
});



function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read === true ? "read it" : "not read yet"}.`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookElement(book) {
  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  let title = document.createElement("p");
  title.innerText = `Title: ${book.title}`;

  let author = document.createElement("p");
  author.innerText = `Author: ${book.author}`;

  let pages = document.createElement("p");
  pages.innerText = `Pages: ${book.pages}`;

  let read = document.createElement("p");
  read.innerText = `Read: ${book.read === true ? "yes" : "no"}`;

  let bookInfo = [title, author, pages, read];

  bookCard.append(...bookInfo);

  return bookCard;
}

function seedLibrary() {
  for (let index = 0; index < 10; index++) {
    let book = new Book(`Test Book ${index + 1}`, "Test Author", 100, index % 2 === 0);

    addBookToLibrary(book);
  }
}

function showLibrary() {
  for (const book of myLibrary) {
    let bookCard = createBookElement(book);
    libraryContainer.appendChild(bookCard);
  }
}




