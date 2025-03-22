document.addEventListener("DOMContentLoaded", () => {
    fetchBooks("bestsellers"); // Fetch default books on page load

    async function fetchBooks(query) {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=6`);
            if (!response.ok) {
                throw new Error("Failed to fetch books");
            }
            const data = await response.json();

            if (!data.docs || data.docs.length === 0) {
                document.getElementById("book-list").innerHTML = "<p>No books found.</p>";
                return;
            }

            displayBooks(data.docs);
        } catch (error) {
            console.error("Error fetching books:", error);
            document.getElementById("book-list").innerHTML = "<p>Failed to load books. Try again later.</p>";
        }
    }

    function displayBooks(books) {
        const bookList = document.getElementById("book-list");
        bookList.innerHTML = "";

        books.forEach(book => {
            const coverID = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : "default-cover.jpg";
            const title = book.title || "Unknown Title";
            const author = book.author_name ? book.author_name[0] : "Unknown Author";
            const description = book.first_sentence ? book.first_sentence[0] : "No description available.";
            const price = (Math.random() * (30 - 10) + 10).toFixed(2); // Random price

            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
            bookCard.innerHTML = `
                <img src="${coverID}" alt="${title}" class="book-image">
                <div class="book-info">
                    <h3 class="book-title">${title}</h3>
                    <p class="book-author">by ${author}</p>
                    <p class="book-description">${description}</p>
                    <p class="book-price">$${price}</p>
                    <div class="book-buttons">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="add-to-wishlist">Add to Wishlist</button>
                    </div>
                </div>
            `;
            bookList.appendChild(bookCard);
        });
    }
});
