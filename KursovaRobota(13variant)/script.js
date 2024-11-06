let booksData = []; // Глобальна змінна для зберігання завантажених книг
let sortOrder = 'asc'; // Поточний порядок сортування: 'asc' - за зростанням, 'desc' - за спаданням

async function loadBooks() {
    try {
        const response = await fetch('13-books.json');
        if (!response.ok) {
            throw new Error(`Помилка завантаження JSON: ${response.status} ${response.statusText}`);
        }
        booksData = await response.json(); // Зберігаємо завантажені книги в глобальну змінну
        displayBooks(booksData);           // Відображаємо книги
        setupSearch(booksData);            // Налаштовуємо пошук
    } catch (error) {
        console.error("Помилка завантаження JSON:", error);
        alert("Не вдалося завантажити дані книг. Перевірте шлях до JSON-файлу та його вміст.");
    }
}

function displayBooks(books) {
    const booksContainer = document.getElementById('booksContainer');
    booksContainer.innerHTML = ''; // Очищення контейнера перед додаванням нових карток

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>Немає результатів для відображення.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Автор:</strong> ${book.author}</p>
            <p><strong>Жанр:</strong> ${book.genre}</p>
            <p><strong>Рік публікації:</strong> ${book.publicationYear}</p>
            <p><strong>Мова:</strong> ${book.language}</p>
            <p><strong>Доступність:</strong> ${book.available ? 'Є в наявності' : 'Недоступно'}</p>
            <p>${book.description}</p>
        `;
        booksContainer.appendChild(bookCard);
    });
}

function setupSearch(books) {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(query) || 
            book.author.toLowerCase().includes(query)
        );
        displayBooks(filteredBooks); // Оновлення відображення з результатами пошуку
    });
}

function sortBooks() {
    // Зміна порядку сортування
    if (sortOrder === 'asc') {
        booksData.sort((a, b) => a.publicationYear - b.publicationYear); // Сортування за зростанням
        sortOrder = 'desc';
    } else {
        booksData.sort((a, b) => b.publicationYear - a.publicationYear); // Сортування за спаданням
        sortOrder = 'asc';
    }
    displayBooks(booksData); // Оновлення відображення після сортування
}

document.addEventListener('DOMContentLoaded', loadBooks);
