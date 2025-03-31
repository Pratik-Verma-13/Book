
// let searchButton = document.getElementById('search-btn');


// searchButton.addEventListener('click', function(){
//     let searchBox = document.getElementById('input-box');
//     let searchValue = searchBox.value.toLowerCase();
//     searchBox.value = "";
//     let displaySearchedBooks = document.getElementById('searched-book-list');
//     displaySearchedBooks.innerHTML = "";
//     let showSearch = document.getElementById('searched-books');
//     if(searchValue == ""){
//         alert("Please enter a search value");
//         return
//     }
//     showSearch.style.display = "none";
//     getBooks().then(books => {
//         for (let key in books) {
//             let book = books[key];
//             let title = book.title.toLowerCase();
//             let author = book.author.toLowerCase();
//             if (title.includes(searchValue) || author.includes(searchValue)) {
//                 console.log("hello");
//                 let child = document.createElement('div');
//                 child.innerHTML = `
//                 <div id="searched-book-card">
//                     <div id="search-book-title">Book Title : ${book.title}</div>
//                     <div id="search-book-author">Book Author : ${book.author}</div>
//                     <div id="search-book-price">Book Price : &#8377; ${book.price}</div>
//                 </div>
//                 `;
//                 displaySearchedBooks.appendChild(child);
//             }
//         }
//     });
//     if (displaySearchedBooks.innerHTML != "") {
//         showSearch.style.display = "block";
        
//     }
//     else{
//         alert("Sorry, No books found");
//     }   
// });


// async function getBooks() {
//     let response = await fetch('books.json');
//     let data = await response.json();  
//     return data;
// }

// function clearInput(){
//     let searchBox = document.getElementById('input-box');
//     searchBox.value = "";
// }

// // Displaying books according to price

// function sortBooks(){
//     getBooks().then(books => {
//         books.sort((a, b) => a.price - b.price);
//         // console.log(books);
//     });
// }

// sortBooks();
// window.addEventListener('load', () => {
//     getBooks().then(books => {
//         for(let key in books){
//             let book = books[key];
//             localStorage.setItem(`${book.id}`, `${JSON.stringify(book)}`);
//         }
//     })
// })


// function addBooks(){
//     let addTitle = document.getElementById('add-book-name');
//     let addAuthor = document.getElementById('add-author-name');
//     let addPrice = document.getElementById('add-price');
//     let addId = document.getElementById('add-id');  
//     if(addTitle.value == "" || addAuthor.value == "" || addPrice.value == "" || addId.value == ""){
//         alert("Please fill the fields");
//         return
//     }
//     let book = {
//         "id": addId.value,
//         "title": addTitle.value,
//         "author": addAuthor.value,
//         "price": addPrice.value
//     }
//     localStorage.setItem(`${book.id}`, `${JSON.stringify(book)}`);   
//     alert("Book added successfully");
// }

// function removeBooks(){
//     let removeId = document.getElementById('remove-id');
//     localStorage.removeItem(`${removeId.value}`);
//     alert("Book removed successfully");
// }

// let submitAdd = document.getElementById('submit-add-form');
// submitAdd.addEventListener('click', addBooks);

document.addEventListener("DOMContentLoaded", () => {
    // Initial list of books
    const allBooks = [
        { image: "", name: "The Alchemist", author: "Paulo Coelho", price: "₹399" },
        { image: "", name: "1984", author: "George Orwell", price: "₹299" },
        { image: "", name: "To Kill a Mockingbird", author: "Harper Lee", price: "₹350" },
        { image: "", name: "The Great Gatsby", author: "F. Scott Fitzgerald", price: "₹280" },
        { image: "", name: "Pride and Prejudice", author: "Jane Austen", price: "₹320" },
        { image: "", name: "The Catcher in the Rye", author: "J.D. Salinger", price: "₹310" },
        { image: "", name: "The Hobbit", author: "J.R.R. Tolkien", price: "₹450" },
        { image: "", name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", price: "₹500" }
    ];

    let displayedBooks = allBooks.slice(0, 8);
    const bookList = document.getElementById("book-list");

    // Function to render books on the page
    function renderBooks() {
        bookList.innerHTML = "";
        displayedBooks.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.innerHTML = `
                <div class="book-info">
                    <h3 class="book-title">${book.name}</h3>
                    <p class="book-author">by ${book.author}</p>
                    <p class="book-price">${book.price}</p>
                </div>
            `;
            bookList.appendChild(bookCard);
        });
    }
    renderBooks();

    // Create input fields and buttons
    const inputContainer = document.createElement("div");
    inputContainer.innerHTML = `
        <input type="text" id="book-name" placeholder="Book Name" class="book-input">
        <input type="text" id="book-author" placeholder="Author Name" class="book-input">
        <input type="text" id="book-price" placeholder="Price (₹)" class="book-input">
        <button id="add-book" class="add-to-cart">Add Book</button>
        <button id="remove-book" class="add-to-wishlist">Remove Book</button>
    `;
    document.getElementById("favorites-section").prepend(inputContainer);

    // Add new book to the displayed list
    document.getElementById("add-book").addEventListener("click", () => {
        const bookName = document.getElementById("book-name").value.trim();
        const bookAuthor = document.getElementById("book-author").value.trim();
        let bookPrice = document.getElementById("book-price").value.trim();
        
        if (!bookName || !bookAuthor || !bookPrice) {
            alert("Please fill in all fields!");
            return;
        }

        // Ensure price starts with ₹ symbol
        if (!bookPrice.startsWith("₹")) {
            bookPrice = "₹" + bookPrice;
        }

        const newBook = { image: "", name: bookName, author: bookAuthor, price: bookPrice };
        displayedBooks.push(newBook);
        renderBooks();
    });

    // Remove a book from the displayed list
    document.getElementById("remove-book").addEventListener("click", () => {
        const bookName = document.getElementById("book-name").value.trim();
        
        const bookIndex = displayedBooks.findIndex(book => book.name.toLowerCase() === bookName.toLowerCase());
        if (bookIndex === -1) {
            alert("Book not found in the list!");
            return;
        }
        
        displayedBooks.splice(bookIndex, 1);
        renderBooks();
    });
});
