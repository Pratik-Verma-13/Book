// DOM Elements
const bookListSection = document.getElementById('book-list');
const searchInput = document.getElementById('input-box');
const searchBtn = document.getElementById('search-btn');
const clearAllBtn = document.getElementById('clear-all');
const searchedBooksSection = document.getElementById('searched-books');
const searchedBookList = document.getElementById('searched-book-list');
const addForm = document.getElementById('add-form');
const submitAddForm = document.getElementById('submit-add-form');
const cartSection = document.getElementById('cart-section');
const cartList = document.getElementById('cart-list');
const totalPriceElement = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');
const wishlistIcon = document.getElementById('wishlist-icon');
const exploreBtn = document.getElementById('explore-btn');
const wishList = document.getElementById('wish-list');
const wishSection = document.getElementById('wish-section');
const clearwishBtn = document.getElementById('clear-wish');


//book data (normally come from an API or database)
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 299,
        genre: "Classic"
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 349,
        genre: "Fiction"
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 279,
        genre: "Dystopian"
    },
    {
        id: 4,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 249,
        genre: "Romance"
    },
    {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 399,
        genre: "Fantasy"
    },
    {
        id: 6,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        price: 449,
        genre: "Fantasy"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayBooks(books);
    setupEventListeners();
    wishSection.style.display = 'none';
});

// Display books in the main section
function displayBooks(booksToDisplay) {
    bookListSection.innerHTML = '';
    
    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-details">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-price">₹${book.price}</p>
                <div class="book-buttons">
                    <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
                    <button class="add-to-wishlist" data-id="${book.id}">❤️ Wishlist</button>
                </div>
            </div>
        `;
        bookListSection.appendChild(bookCard);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', search);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            search();
        }
    });
    
    // Clear search input
    clearAllBtn.addEventListener('click', clearInput);
    
    // Add new book form
    submitAddForm.addEventListener('click', addNewBook);
    
    // Cart functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(e.target.getAttribute('data-id')));
        }
        
        if (e.target.classList.contains('remove-from-cart')) {
            removeFromCart(parseInt(e.target.getAttribute('data-id')));
        }
    });
    
    // Clear cart
    clearCartBtn.addEventListener('click', clearCart);

     // wishlist functionality
     document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-wishlist')) {
            addTowish(parseInt(e.target.getAttribute('data-id')));
        }
        
        if (e.target.classList.contains('remove-from-wishlist')) {
            removeFromwish(parseInt(e.target.getAttribute('data-id')));
        }
    });
    
    // Clear wishlist
    clearwishBtn.addEventListener('click', clearwish);

    
    // Wishlist icon
    wishlistIcon.addEventListener('click', function() {
        wishSection.style.display = wishSection.style.display === 'block' ? 'none' : 'block';
    });
    
    // Explore button
    exploreBtn.addEventListener('click', function() {
        document.getElementById('book-list').scrollIntoView({ behavior: 'smooth' });
    });
}

// search function
function search() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        alert('Please enter a search term');
        return;
    }
    
    const filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) || 
        book.author.toLowerCase().includes(searchTerm) ||
        book.genre.toLowerCase().includes(searchTerm)
    );
    
    if (filteredBooks.length === 0) {
        searchedBookList.innerHTML = '<p>No books found matching your search.</p>';
    } else {
        displaySearchedBooks(filteredBooks);
    }
    
    searchedBooksSection.style.display = 'block';
    searchedBooksSection.scrollIntoView({ behavior: 'smooth' });
}

// Display searched books
function displaySearchedBooks(booksToDisplay) {
    searchedBookList.innerHTML = '';
    
    booksToDisplay.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'searched-book-card';
        bookCard.innerHTML = `
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <p class="book-price">₹${book.price}</p>
            <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
        `;
        searchedBookList.appendChild(bookCard);
    });
}

// Clear search input
function clearInput() {
    searchInput.value = '';
    searchedBooksSection.style.display = 'none';
}

// Add new book to the collection
function addNewBook() {
    const title = document.getElementById('add-book-name').value.trim();
    const author = document.getElementById('add-author-name').value.trim();
    const price = document.getElementById('add-price').value.trim();
    const id = parseInt(document.getElementById('add-id').value);
    
    if (!title || !author || !price || !id) {
        alert('Please fill in all fields');
        return;
    }
    
    if (isNaN(id) || id < 101) {
        alert('Please enter a valid ID (minimum 101)');
        return;
    }
    
    if (books.some(book => book.id === id)) {
        alert('A book with this ID already exists');
        return;
    }
    
    const newBook = {
        id,
        title,
        author,
        price: parseFloat(price),
        genre: "Unknown"
    };
    
    books.push(newBook);
    displayBooks(books);
    
    // Clear the form
    document.getElementById('add-book-name').value = '';
    document.getElementById('add-author-name').value = '';
    document.getElementById('add-price').value = '';
    document.getElementById('add-id').value = '';
    
    alert('Book added successfully!');
}
// Cart data
let cart = [];
let wish=[];
let totalPrice = 0;
// Add to cart functionality
function addToCart(bookId) {
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        console.error('Book not found');
        return;
    }
    
    // Check if book is already in cart
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }
    
    totalPrice += book.price;
    updateCartDisplay();
}

// Remove from cart functionality
function removeFromCart(bookId) {
    const itemIndex = cart.findIndex(item => item.id === bookId);
    
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    totalPrice -= item.price;
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }
    
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty</p>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.title} (${item.quantity})</span>
            <span>₹${item.price * item.quantity}</span>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
    
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Clear cart
function clearCart() {
    cart = [];
    totalPrice = 0;
    updateCartDisplay();
}
function addTowish(bookId){
    const book=books.find(item=>item.id===bookId);

    if (!book) {
        console.error('Book not found');
        return;
    }
    // Check if book is already in cart
    const existingItem = wish.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        wish.push({
            ...book,
            quantity: 1
        });
    }
    updatewishDisplay();
}
function removeFromwish(bookId) {
    const itemIndex =wish.findIndex(item => item.id === bookId);
    
    if (itemIndex === -1) return;
    
    const item = wish[itemIndex];
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart.splice(itemIndex, 1);
    }
    updatewishDisplay();
}
function updatewishDisplay() {
    wishList.innerHTML = '';
    
    if (wish.length === 0) {
        wishList.innerHTML = '<p>Your wishlist is empty</p>';
        return;
    }
    
    wish.forEach(item => {
        const wishItem = document.createElement('div');
        wishItem.className = 'wish-item';
        wishItem.innerHTML = `
            <span>${item.title}</span>
        `;
        wishList.appendChild(wishItem);
    });
}
// Clear wish
function clearwish() {
    wish = [];
    updatewishDisplay();
}
