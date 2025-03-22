let Books = {
    "book1": {
        "title": "The Alchemist",
        "author": "Paulo Coelho",
        "price": 10.00,
        "image": "images/alchemist.jpg"
    },
    "book2": {
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "price": 12.00,
        "image": "images/gatsby.jpg"
    },
    "book3": {
        "title": "The Catcher in the Rye",
        "author": "J.D. Salinger",
        "price": 15.00,
        "image": "images/catcher.jpg"
    },
    "book4": {
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "price": 20.00,
        "image": "images/mockingbird.jpg"
    }
}

let buttons = document.getElementsByTagName('button');
let buttons_array = Array.from(buttons);

buttons_array.forEach(button => {
    button.addEventListener('click', function() {
        alert("Work in progress!!");
    });
})

let clearIcon = document.getElementById('clear-icon');

function clearInput() {
    let inputValue = document.getElementById('input-box');
    inputValue.value = '';
}

// clearIcon.addEventListener('click', clearInput);

// let profileIcon = document.getElementById('profile-icon');
let cartIcon = document.getElementById('cart-icon');

cartIcon.addEventListener('click', function() {
    alert("Cart page is under construction!!");
});