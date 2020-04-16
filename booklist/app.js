// Book Model
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// Handle UI Tasks
class UI {

    static displayBooks() {
        const books = LocalStore.getBooks();
        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const bookList = document.querySelector('#book-list')
        let newTrRow = document.createElement('tr')
        newTrRow.innerHTML =
            `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        bookList.appendChild(newTrRow)

        LocalStore.addBook(book)
        UI.showAlerts('New Book is Added', 'success')
        UI.clearFields()
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

    static removeBook(bookElement) {
        if (bookElement.classList.contains('delete')) {
            bookElement.parentElement.parentElement.remove()
            UI.showAlerts('Book is Removed', 'success')
            LocalStore.removeBook(bookElement.parentElement.parentElement.children[2].textContent)
        }
    }

    static showAlerts(message, color) {
        const divEl = document.createElement('div');
        divEl.className = `alert alert-${color} text-center`;
        divEl.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(divEl, form)

        // show toast only for 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000)

    }
}

// Store books : In LocalStorage
class LocalStore {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }

    static addBook(book) {
        let books = LocalStore.getBooks()
        books.push(book)
        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        let books = LocalStore.getBooks()
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}


// Events

// 1. Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks())

// 2. Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {
        UI.showAlerts('Missing Required Fields', 'danger')
    } else {
        const newBook = new Book(title, author, isbn)
        UI.addBookToList(newBook)

    }
})

// 3. Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.removeBook(e.target)
})