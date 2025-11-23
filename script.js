const table = document.querySelector("#booksTable");
const dialog = document.querySelector("#dialog");
const showDailog = document.querySelector("#show-dialog");
const confirmButton = document.querySelector("#confirmBtn");
const myLibrary = [];

Book.prototype.toggleReadStatus = function () {
   if (this.answer === "read") {
      this.answer = "not read";
   } else {
    this.answer = "read";
   }
}


function Book (title, author, pageNumber, publisher, answer) {

    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.publisher = publisher;
    this.answer = answer;
}


function addBookToLibrary (title, author, pageNumber, publisher, answer) {
   var book = new Book(title, author, pageNumber,  publisher, answer);
  
   
   myLibrary.push(book)
   myLibrary.map((book) => {book.id = crypto.randomUUID()});
}
  
function displayBooks() {
  const tableRows = table.rows;
  
  if (tableRows.length === 1) {
    myLibrary.forEach((book, index) => {
      addBookRow(book, ind = index + 1);
      
    });
  } else {
    const lastBook = myLibrary[myLibrary.length - 1];
    addBookRow(lastBook, ind + 1);
    ind++;
  }
}

// Event delegation for delete buttons
table.addEventListener("click", (e) => {
  if (e.target.classList.contains('book-button')) {
    const bookId = e.target.dataset.uniqueId;
    const rowToDelete = e.target.closest('tr');
    console.log(rowToDelete)

    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    if (bookIndex > -1) {
      myLibrary.splice(bookIndex, 1);
    }
    
    rowToDelete.remove();
    
  
    rebuildTable();
  }
});

 table.addEventListener("click", (e) => {

    const cell = e.target.closest(".answer");
     if (!cell) return;
     const row = cell.closest("tr");
     const uniqueId = row.querySelector("[data-unique-id]").dataset.uniqueId;
     
    const book = myLibrary.find(bk => bk.id === uniqueId);

    book.toggleReadStatus();
    rebuildTable();
     
});


function rebuildTable() {
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  
  displayBooks();
  
  changeReadStatusColor();
}


function addBookRow(book, index) {
  const newRow = table.insertRow();
  const values = [index, book.title, book.author, book.pageNumber, book.publisher, book.answer];
    for (const value of values) {
     if (value === null || value === " " || value === undefined) {
      newRow.deleteRow();
      break;
    } else {
      const cell = newRow.insertCell();
      cell.textContent = value;
    }
  };
  
  changeReadStatusColor();
 // console.log(book.id);
  addDeleteButton(newRow, book.id);
}

function addDeleteButton (row, identifier) {

  const deleteCell =  row.insertCell();
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'book-button';
  deleteBtn.textContent = 'Delete Book';
  deleteBtn.setAttribute('data-unique-id', identifier);
  deleteCell.appendChild(deleteBtn);

}


showDailog.addEventListener("click", () => {
  dialog.showModal();

})

confirmButton.addEventListener("click", (event) => {
  createNewBook();
  event.preventDefault();
  dialog.close();
})




  
function createNewBook () {
  const formElement = document.querySelector('form');
  const formData = new FormData(formElement);
  formValue = [];
  for (let [key, value] of formData) {

    formValue.push(value);
  } 
  addBookToLibrary(formValue[0], formValue[1], formValue[2], formValue[3], formValue[4], formValue[5], formValue[6]);
  displayBooks();
  console.log(formValue);
}

function changeReadStatusColor() {
   const columnCells = document.querySelectorAll("table tr:not(:first-child) td:nth-child(6)");
   columnCells.forEach((cell) => {
    cell.classList.add("answer")
    if (cell.textContent == "read") {
      cell.style.color = "green";
    } else if (cell.textContent == "not read") {
      cell.style.color = "red";
    } else {
      cell.style.color = "orange";
    }
  })
}



console.log(addBookToLibrary("Hobbit", "J.R.R. Tolkien", 295, "Georgia",  "not read"));
console.log(addBookToLibrary("Harry Potter", "J.K. Rowlings", 1720,  "Elsevier", "read"));
console.log(addBookToLibrary("Unit Operations in Chem Eng", "Coulson and Richardson", 970, "Mc-Graw Hills", "read"));

displayBooks();
changeReadStatusColor();

