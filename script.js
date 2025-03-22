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