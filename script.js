function toggleDropdown() {
    const dropdown = document.getElementById("accountDropdown");
    dropdown.classList.toggle("show");
  }
  
  // Zamykanie menu po kliknięciu poza nim
  window.onclick = function (event) {
    if (!event.target.closest('.user-button')) {
      const dropdown = document.getElementById("accountDropdown");
      if (dropdown && dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      }
    }
  };
  
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
          <a href="#">Zaloguj</a>
          <a href="#">Zarejestruj</a>`;
    }
  });
   