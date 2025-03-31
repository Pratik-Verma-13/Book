// Search functionality
let searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    
    let searchBox = document.getElementById('input-box');
    let searchValue = searchBox.value.toLowerCase();
    // searchBox.value = "";
    let displaySearchedBooks = document.getElementById('searched-book-list');
    displaySearchedBooks.innerHTML = "";
    let showSearch = document.getElementById('searched-books');
    if (searchValue == "") {
        alert("Please enter a search value");
        return
    }
    showSearch.style.display = "none";
    // console.log(books);
    bookObject.forEach(book => () => {
        title = book.title;
        author = book.author;
        if(title.include(searchValue)||author.include(searchValue)){
            let bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-price">₹ ${book.price}<div>
            <div class="id">${book.id}</div>
        `;
            displaySearchedBooks.appendChild(bookCard);
        }
    })
    if (displaySearchedBooks.innerHTML == "") {
        alert("Sorry, No books found");
        return
    }
    else {
        showSearch.style.display = "block";
    }
    
});

const bookObject = [
    {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 10.00,
        "id": 101
    },
    {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 12.00,
        "id": 102
    },
    {
        "title": "The great in the Rye",
        "author": "J.D. Salinger",
        "price": 3.00,
        "id": 103
    },
    {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 20.00,
        "id": 104
    }
]

// Clearing input box
function clearInput() {
    let searchBox = document.getElementById('input-box');
    searchBox.value = "";
}

// Displaying books according to price
function sortBooks() {
    
}

// Storing books in local storage from json file
function displayBooks(){
    const displayBookList = document.getElementById("book-list");
    displayBookList.innerHTML = "";
    bookObject.forEach(book => { 
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <div class="book-title">${book.title}</div>
            <div class="book-author">${book.author}</div>
            <div class="book-price">₹ ${book.price}<div>
            <div class="id">${book.id}</div>
        `;
        displayBookList.appendChild(bookCard)
    });      
}
displayBooks()
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
    bookObject.push(book);
    alert("Book added successfully");
    displayBooks();
}


// removing books
const removeBooks = document.getElementsByClassName("remove-btn");
removeBooks.forEach(element => {
   element.addEventListener("click", () => {
        const toRemoveId = element.parentElement.children[3].innerText;
        bookObject.forEach(book, () => {
            if (book.id = toRemoveId){
                bookObject.pop(book);
                return;
            }
        })
   })
});

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
