const myLibrary = [];
const libraryContainer = document.querySelector(".library-container");
const showFormBtn = document.querySelector("#showForm");
const dialogModal = document.querySelector("dialog");
const form = document.querySelector("dialog form");
const addBtn = document.querySelector("#add");
const cancelBtn = document.querySelector("#cancel");

window.addEventListener("load", () => {
  seedLibrary();
  showLibrary();
});

showFormBtn.addEventListener("click", () => {
  dialogModal.showModal();
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  dialogModal.close();
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let formData = new FormData(form);
  let book = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("read") === "on"
  );

  addBookToLibrary(book);
  libraryContainer.appendChild(createBookElement(book));
  form.reset();
  dialogModal.close();
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  get info() {
    return this.formatInfo();
  }

  updateReadStatus() {
    this.read = !this.read;
  }

  formatInfo() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "read it" : "not read yet"}.`;
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookElement(book) {
  let bookCard = document.createElement("div");
  bookCard.setAttribute("data-index", myLibrary.indexOf(book).toString());
  bookCard.classList.add("book-card");

  let title = document.createElement("p");
  title.innerText = `Title: ${book.title}`;

  let author = document.createElement("p");
  author.innerText = `Author: ${book.author}`;

  let pages = document.createElement("p");
  pages.innerText = `Pages: ${book.pages}`;

  let read = document.createElement("p");
  read.innerText = `Read: ${book.read === true ? "yes" : "no"}`;

  let btnContainer = document.createElement("div");
  btnContainer.classList.add("book-buttons");

  let updateBtn = document.createElement("button");
  updateBtn.innerText = "Update";

  updateBtn.addEventListener("click", (event) => {
    let bookToUpdate = event.target.parentNode.parentNode;
    let index = parseInt(bookToUpdate.dataset.index);
    let book = myLibrary.at(index);

    book.updateReadStatus();
    read.innerText = `Read: ${book.read === true ? "yes" : "no"}`;
  });

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", (event) => {
    let bookToRemove = event.target.parentNode.parentNode;
    let index = parseInt(bookToRemove.dataset.index);

    bookToRemove.remove();
    myLibrary.splice(index, 1);
    updateBookIndeces();
  });

  btnContainer.appendChild(updateBtn);
  btnContainer.appendChild(deleteBtn);

  let bookInfo = [title, author, pages, read, btnContainer];

  bookCard.append(...bookInfo);

  return bookCard;
}

function updateBookIndeces() {
  let books = [...libraryContainer.children];

  books.forEach((book, i) => {
    book.dataset.index = i.toString();
  });
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




