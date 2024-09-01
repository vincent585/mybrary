function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${pageCount} pages, ${this.read === true ? "read it" : "not read yet"}.`
  };
};