function toggleDropdown() {
    const dropdown = document.getElementById("accountDropdown");
    dropdown.classList.toggle("show");
}

// Zamykanie dropdown menu po kliknięciu poza nim
window.onclick = function(event) {
    if (!event.target.matches('.user-button') && !event.target.matches('.fa-user')) {
        const dropdown = document.getElementById("accountDropdown");
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
}

// Przykładowy użytkownik
const isLoggedIn = false; // Zmień na true aby zasymulować zalogowanie

document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.getElementById("accountDropdown");
    if (dropdown) {
        dropdown.innerHTML = isLoggedIn
            ? `
              <a href="#">Moje konto</a>
              <a href="#">Ustawienia</a>
              <a href="#">Wyloguj</a>`
            : `
              <a href="#" id="loginLink">Zaloguj</a>
              <a href="#">Zarejestruj</a>`;
    }

    // Inicjalizacja funkcjonalności formularza logowania
    initializeLoginForm();
});

// Funkcja do tworzenia formularza logowania
function createLoginForm() {
    const formOverlay = document.createElement('div');
    formOverlay.id = 'formOverlay';
    formOverlay.className = 'form-overlay';
    
    formOverlay.innerHTML = `
        <div class="login-form">
            <button class="close-btn" id="closeFormBtn">&times;</button>
            <h2>Zaloguj się</h2>
            <form id="loginFormElement">
                <div class="form-group">
                    <label for="username">Login:</label>
                    <input type="text" id="username" name="username" required>
                </div>
                <div class="form-group">
                    <label for="password">Hasło:</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Zaloguj</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(formOverlay);
    return formOverlay;
}

// Funkcja do inicjalizacji formularza logowania
function initializeLoginForm() {
    const loginLink = document.getElementById('loginLink');
    let formOverlay = document.getElementById('formOverlay');
    
    if (!formOverlay) {
        formOverlay = createLoginForm();
    }
    
    const closeFormBtn = document.getElementById('closeFormBtn');
    const loginForm = document.getElementById('loginFormElement');

    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            formOverlay.style.display = 'flex';
        });
    }

    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', () => {
            formOverlay.style.display = 'none';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === 'admin' && password === 'admin') {
                // alert('Zalogowano pomyślnie!');
                formOverlay.style.display = 'none';
                // Tutaj możesz dodać logikę zmiany stanu na zalogowany
                updateUserState(true);
            } else {
                // alert('Nieprawidłowy login lub hasło!');
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === formOverlay) {
            formOverlay.style.display = 'none';
        }
    });
}

// Funkcja do aktualizacji stanu użytkownika
function updateUserState(loggedIn) {
    const dropdown = document.getElementById("accountDropdown");
    if (dropdown) {
        if (loggedIn) {
            dropdown.innerHTML = `
                <a href="settings.html">Settings</a>
                <hr>
                <a href="#" class="logout" onclick="logout()">Wyloguj</a>
            `;
            const logoutLink = dropdown.querySelector('.logout');
            if (logoutLink) {
                logoutLink.style.color = '#e74c3c';
            }
        } else {
            dropdown.innerHTML = `
                <a href="#" id="loginLink">Zaloguj</a>
                <a href="#">Zarejestruj</a>
            `;
            // Ponownie inicjalizuj funkcjonalność logowania
            initializeLoginForm();
        }
    }
}

// Funkcja wylogowania
function logout() {
    updateUserState(false);
    // alert('Wylogowano pomyślnie!');
}

const featuredMovies = [
    {
        title: "Supernatural",
        seasons: "1-15 seasons (2005-2020)",
        cast: "Jensen Ackles (Dean Winchester), Jared Padalecki (Sam Winchester)",
        genre: "Horror, Action, Sci-Fi",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://via.placeholder.com/800x450?text=Supernatural",
        color: "#e74c3c"
    },
    {
        title: "Doctor Strange (2016)",
        seasons: "",
        cast: "Benedict Cumberbatch (Doctor Strange)",
        genre: "Action, Adventure, Fantasy",
        description: "A former neurosurgeon embarks on a journey of healing...",
        image: "https://via.placeholder.com/800x450?text=Doctor+Strange",
        color: "#2ecc71"
    },
    {
        title: "Another Movie",
        seasons: "",
        cast: "Actor A, Actor B",
        genre: "Genre",
        description: "Description",
        image: "https://via.placeholder.com/800x450?text=Another+Movie",
        color: "#3498db"
    }
];

const featuredInfo = document.querySelector('.featured-info');
const featuredImage = document.querySelector('.featured-image');
const dots = document.querySelectorAll('.dot');
const nextButton = document.querySelector('.next-button');
let currentIndex = 0;

function updateFeaturedMovie(index) {
    const movie = featuredMovies[index];
    featuredInfo.querySelector('h2').textContent = movie.title;
    featuredInfo.querySelector('.seasons').textContent = movie.seasons;
    featuredInfo.querySelector('.cast').innerHTML = `<strong>Cast:</strong> ${movie.cast}`;
    featuredInfo.querySelector('.genre').innerHTML = `<strong>Genre:</strong> ${movie.genre}`;
    featuredInfo.querySelector('.description').innerHTML = `${movie.description}`;
    featuredImage.style.backgroundImage = `url('${movie.image}')`;
    featuredImage.style.backgroundColor = movie.color;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % featuredMovies.length;
    updateFeaturedMovie(currentIndex);
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateFeaturedMovie(index);
    });
});

updateFeaturedMovie(0);

const userButton = document.querySelector('.user-button');
const dropdownMenu = document.getElementById('accountDropdown');

// Funkcja do tworzenia zawartości dropdown menu (dla zalogowanych użytkowników)
function createDropdownMenu() {
    if (dropdownMenu) {
        dropdownMenu.innerHTML = `
            <a href="settings.html">Settings</a>
            <hr></hr>
            <a href="#" class="logout">Wyloguj</a>
        `;
        
        // Dodajemy styl do logout linku
        const logoutLink = dropdownMenu.querySelector('.logout');
        if (logoutLink) {
            logoutLink.style.color = '#e74c3c';
        }
    }
}

// Inicjalizacja obsługi przycisku użytkownika
if (userButton && dropdownMenu) {
    // Nasłuchiwanie kliknięcia na przycisk użytkownika
    userButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Zapobiega natychmiastowemu zamknięciu
        toggleDropdown();
    });
    
    // Zapobieganie zamknięciu po kliknięciu w dropdown
    dropdownMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}