// Search functionality
let searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', async function () {
    
    let searchBox = document.getElementById('input-box');
    let searchValue = searchBox.value.toLowerCase();
    searchBox.value = "";
    let displaySearchedBooks = document.getElementById('searched-book-list');
    displaySearchedBooks.innerHTML = "";
    let showSearch = document.getElementById('searched-books');
    if (searchValue == "") {
        alert("Please enter a search value");
        return
    }
    showSearch.style.display = "none";
    let books = await getBooks();
    console.log(books);
    for (let key in books) {
        let book = books[key];
        let title = book.title.toLowerCase();
        let author = book.author.toLowerCase();
        if (title.includes(searchValue) || author.includes(searchValue)) {
            console.log("hello");
            let child = document.createElement('div');
            child.innerHTML = `
            <div id="searched-book-card">
                <div id="search-book-title">Book Title : ${book.title}</div>
                <div id="search-book-author">Book Author : ${book.author}</div>
                <div id="search-book-price">Book Price : &#8377; ${book.price}</div>
            </div>
            `;
            window.location.href = "#searched-books";
            displaySearchedBooks.appendChild(child);

        }
        
    }
    if (displaySearchedBooks.innerHTML == "") {
        alert("Sorry, No books found");
        return
    }
    else {
        showSearch.style.display = "block";
    }
    
});

// Retreving books from json file
async function getBooks() {
    let response = await fetch('books.json');
    let data = await response.json();
    return data;
}


// Clearing input box
function clearInput() {
    let searchBox = document.getElementById('input-box');
    searchBox.value = "";
}

// Displaying books according to price
function sortBooks() {
    getBooks().then(books => {
        books.sort((a, b) => a.price - b.price);
        // console.log(books);
    });
}

// Storing books in local storage from json file
window.addEventListener('load', () => {
    getBooks().then(books => {
        localStorage.setItem('books', JSON.stringify(books));
        let books = localStorage.getItem
        const bookDisplay = document.getElementById("book-list");
        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <div id="book-title">Book Title</div>
            <div id="book-author">Book Author</div>
            <div id="book-price">Book Price</div>
            <div id="book-id">Book ID</div>
        `;
        bookDisplay.appendChild(bookCard);
    })
})

// adding new books
let submitAdd = document.getElementById('submit-add-form');
submitAdd.addEventListener('click', addBooks);
function addBooks() {
    let addTitle = document.getElementById('add-book-name');
    let addAuthor = document.getElementById('add-author-name');
    let addPrice = document.getElementById('add-price');
    let addId = document.getElementById('add-id');
    if (addTitle.value == "" || addAuthor.value == "" || addPrice.value == "" || addId.value == "") {
        alert("Please fill the fields");
        return
    }
    let book = {
        "title": addTitle.value,
        "author": addAuthor.value,
        "price": addPrice.value,
        "id": addId.value,
    }
    localStorage.setItem(`${book.id}`, `${JSON.stringify(book)}`);
    alert("Book added successfully");
}

// removing books
function removeBooks() {
    let removeId = document.getElementById('remove-id');
    localStorage.removeItem(`${removeId.value}`);
    alert("Book removed successfully");
}

// Adding books to cart
addToCart = Array.from(document.getElementsByClassName('add-to-cart'));
addToCart.forEach(element => {
    element.addEventListener('click', () => {
        cartArray = localStorage.getItem('cart')
        if (cartArray == null) {
            cartArray = [];
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
        else {
            cartArray = JSON.parse(cartArray);
            cartArray.push(element.parentElement.children[0].innerText);
            localStorage.setItem("cart", JSON.stringify(cartArray));
        }
    })
})

// Cart Functionality
let cart = [];

function updateCartUI() {
    let cartList = document.getElementById('cart-list');
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((book, index) => {
        totalPrice += book.price;
        let cartItem = document.createElement('div');
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div>${book.title} - ₹${book.price}</div>
            <button class="remove-from-cart" data-index="${index}">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    document.getElementById('total-price').innerText = totalPrice;

    attachRemoveFromCartEvents();
}

function attachAddToCartEvents() {
    let buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let book = {
                id: this.getAttribute('data-id'),
                title: this.getAttribute('data-title'),
                price: parseFloat(this.getAttribute('data-price'))
            };
            cart.push(book);
            updateCartUI();
        });
    });
}
