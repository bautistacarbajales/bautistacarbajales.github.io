const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Al cargar la página, verifica el tema guardado en el local storage
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.src = '../bin/LazarilloIconBlack.png';
  } else {
    body.classList.remove('light-mode');
    themeIcon.src = '../bin/LazarilloIconWhite.png';
  }
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    themeIcon.src = '../bin/LazarilloIconBlack.png';
    localStorage.setItem('theme', 'light'); // Guarda el tema claro
  } else {
    themeIcon.src = '../bin/LazarilloIconWhite.png';
    localStorage.setItem('theme', 'dark'); // Guarda el tema oscuro
  }
});