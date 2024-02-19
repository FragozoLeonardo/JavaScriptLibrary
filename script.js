let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ` + (read ? "read" : "not read yet");
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Set up event listeners for user interaction
document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('new-book-form').hidden = false;
});

document.getElementById('new-book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    addBookToLibrary(title, author, pages, read);
    render();
    e.target.reset();
    e.target.hidden = true;
});

// Display library on screen
function render() {
    const display = document.getElementById('library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i], i);
    }
}

function createBook(item, i) {
  const library = document.getElementById('library-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const toggleReadBtn = document.createElement('button');

  bookDiv.classList.add('book');
  bookDiv.textContent = item.info();
  bookDiv.setAttribute('data-index', i);
  removeBtn.textContent = 'Remove';
  toggleReadBtn.textContent = item.read ? 'Read ✅' : 'Not Read';
  bookDiv.appendChild(removeBtn);
  bookDiv.appendChild(toggleReadBtn);

  library.appendChild(bookDiv);

  removeBtn.addEventListener('click', (e) => {
      myLibrary.splice(i, 1);
      render();
  });

  toggleReadBtn.addEventListener('click', (e) => {
      item.read = !item.read;
      render();
  });
}

addBookToLibrary('Book 1', 'Author 1', '123', true);
addBookToLibrary('Book 2', 'Author 2', '456', false);
render();