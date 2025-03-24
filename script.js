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
    var count = 0;
    getBooks().then(books => {
        for (let key in books) {
            let book = books[key];
            let title = book.title.toLowerCase();
            let author = book.author.toLowerCase();
            if (title.includes(searchValue) || author.includes(searchValue)) {
                count += 1;
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
    console.log(count);
    showSearch.style.display = "block";
});


async function getBooks() {
    let response = await fetch('books.json');
    let data = await response.json();  
    return data;
}

