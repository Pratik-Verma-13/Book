// let Books = {
//     "book1": {
//         "title": "The Alchemist",
//         "author": "Paulo Coelho",
//         "price": 10.00,
//         "image": "images/alchemist.jpg"
//     },
//     "book2": {
//         "title": "The Great Gatsby",
//         "author": "F. Scott Fitzgerald",
//         "price": 12.00,
//         "image": "images/gatsby.jpg"
//     },
//     "book3": {
//         "title": "The Catcher in the Rye",
//         "author": "J.D. Salinger",
//         "price": 15.00,
//         "image": "images/catcher.jpg"
//     },
//     "book4": {
//         "title": "To Kill a Mockingbird",
//         "author": "Harper Lee",
//         "price": 20.00,
//         "image": "images/mockingbird.jpg"
//     }
// }

let searchButton = document.getElementById('search-btn');


searchButton.addEventListener('click', function(){
    let searchBox = document.getElementById('input-box');
    let searchValue = searchBox.value.toLowerCase();
    searchBox.value = "";
    let displaySearchedBooks = document.getElementById('searched-book-list');
    displaySearchedBooks.innerHTML = "";
    let showSearch = document.getElementById('searched-books');
    if(searchValue == ""){
        alert("Please enter a search value");
        return
    }
    showSearch.style.display = "none";
    getBooks().then(books => {
        for (let key in books) {
            let book = books[key];
            let title = book.title.toLowerCase();
            let author = book.author.toLowerCase();
            if (title.includes(searchValue) || author.includes(searchValue)) {
                let child = document.createElement('div');
                child.innerHTML = `
                <div id="searched-book-card">
                    <div id="search-book-title">Book Title : ${book.title}</div>
                    <div id="search-book-author">Book Author : ${book.author}</div>
                    <div id="search-book-price">Book Price : &#8377; ${book.price}</div>
                </div>
                `;
                displaySearchedBooks.appendChild(child);
            }
        }
    });
    if (displaySearchedBooks.innerHTML == "") {
        alert("Sorry, No books found");
    }
    else{
        showSearch.style.display = "block";
    }
    
});


async function getBooks() {
    let response = await fetch('books.json');
    let data = await response.json();  
    return data;
}

function clearInput(){
    let searchBox = document.getElementById('input-box');
    searchBox.value = "";
}

// Displaying books according to price

function sortBooks(){
    getBooks().then(books => {
        books.sort((a, b) => a.price - b.price);
        // console.log(books);
    });
}

sortBooks();
window.addEventListener('load', () => {
    getBooks().then(books => {
        for(let key in books){
            let book = books[key];
            localStorage.setItem(`${book.id}`, `${book.title}`);
        }
    })
})


function addBooks(){
    let addTitle = document.getElementById('add-book-name');
    let addAuthor = document.getElementById('add-author-name');
    let addPrice = document.getElementById('add-price');
    let addId = document.getElementById('add-id');  
    
    let book = {
        "id": addId.value,
        "title": addTitle.value,
        "author": addAuthor.value,
        "price": addPrice.value
    }
    localStorage.setItem(`${book.id}`, `${book.title}`);   
    alert("Book added successfully");
}

function removeBooks(){
    let removeId = document.getElementById('remove-id');
    localStorage.removeItem(`${removeId.value}`);
    alert("Book removed successfully");
}

let submitAdd = document.getElementById('submit-add-form');
submitAdd.addEventListener('click', addBooks);