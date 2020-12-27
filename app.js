  //class to instantiate Book
  class BookList {
    constructor(tital, author, isbn) {
      this.tital = tital;
      this.author = author;
      this.isbn = isbn;
    }
  }

  //class to display Book
  class UI {
    static displayBooks() {
      const storedBooks = storeBook.getBook();

      const books = storedBooks;
      books.forEach((eachBook) => UI.addBookToList(eachBook));
    }

    static addBookToList(book) {
      const bookListElem = document.querySelector('#bookList');
      const row = document.createElement('tr');
      row.innerHTML = `
      <td style="background-color:#F7DBB1">${book.tital}</td>
      <td style="background-color:#F7DBB1">${book.author}</td>
      <td style="background-color:#F7DBB1">${book.isbn}</td>
      <td style="background-color:#F7DBB1"><a href="#"  class="btn btn-danger btn-sm delete">X</a></td>
      `;
      bookListElem.appendChild(row);

    }

    //Method for deleting book:
    static deleteBook(elem) {
      //if element is delete button then remove it's parent
      if (elem.classList.contains('delete')) {
        elem.parentElement.parentElement.remove();
      }
    }

    static showAlert(message, className) {
      const div = document.createElement('div');
      div.id = 'customDiv';
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#form-id');
      container.insertBefore(div, form);

      setTimeout(function(arg) {
        container.removeChild(div);
      }, 4000)
    }


    static clearFields() {
      document.querySelector('#bookName').value = "";
      document.querySelector('#authorName').value = "";
      document.querySelector('#isbnCode').value = "";
    }

    //custom delete book logic
    static removeBooks(index) {

    }
  }

  class storeBook {

    static getBook() {
      let books;
      if (localStorage.getItem('books') == null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }
    static addBook(book) {
      const books = storeBook.getBook();
      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {
      const books = storeBook.getBook();
      books.forEach((book, index) => {
        if (book.isbn == isbn) {
          books.splice(index, 1);
        }
      })
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

  //Event:display book
  document.addEventListener('DOMContentLoaded', UI.displayBooks);


  //Event:Add book
  document.querySelector('#form-id').addEventListener('submit', event => {
    event.preventDefault();
    const titalInp = document.querySelector('#bookName').value;
    const writerInp = document.querySelector('#authorName').value;
    const isbnInp = document.querySelector('#isbnCode').value;
    
    let formList=[document.querySelector('#bookName'),document.querySelector('#authorName'),document.querySelector('#isbnCode')];
    if (titalInp === '' || writerInp === '' || isbnInp === '') {
      UI.showAlert('Please fill all the details. （┬┬＿┬┬）', 'danger');
      formList.forEach((e)=>{
        if (e.value==='') {
          e.classList.add('is-invalid');
        }else{
          e.classList.remove('is-invalid');
        }
      });
      
    } else {
      formList.forEach((e)=>{
       e.classList.remove('is-invalid');
       e.classList.add('is-valid');
       
       setTimeout(function() {
         e.classList.remove('is-valid');
       }, 2000)
      });
      UI.showAlert('Your book is published (〃＾▽＾〃)o', 'success');
     document.querySelector('#bookName').classList.add('is-valid');
     document.querySelector('#authorName').classList.add('is-valid');
     document.querySelector('#isbnCode').classList.add('is-valid');
     
      const books = new BookList(titalInp, writerInp, isbnInp);
      console.table(books);
      UI.addBookToList(books);
      storeBook.addBook(books);
      UI.clearFields();
    }

  })


  //Event for delete book
  const bookListElem = document.querySelector('#bookList');
  bookListElem.addEventListener('click', e => {
    //giving what is touched inside bookList as an argument to deleteBook method
    e.preventDefault();
    UI.deleteBook(e.target);
    storeBook.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book removed ☑', 'success');
  })