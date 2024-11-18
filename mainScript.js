const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeProfile = document.getElementById('theme-profile');
const themeContrast = document.getElementById('theme-contrast');
const body = document.body;

// Al cargar la página, verifica el tema guardado en el local storage
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.src = 'bin/LazarilloIconBlack.png';
    themeContrast.src = 'bin/temaBlack.png';
    themeProfile.src = 'bin/perfilBlack.png';
    
    
  } else {
    body.classList.remove('light-mode');
    themeIcon.src = 'bin/LazarilloIconWhite.png';
    themeContrast.src = 'bin/tema.png';
    themeProfile.src = 'bin/perfil.png';
  }
});

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  if (body.classList.contains('light-mode')) {
    themeIcon.src = 'bin/LazarilloIconBlack.png';
    localStorage.setItem('theme', 'light'); // Guarda el tema claro
    themeContrast.src = 'bin/temaBlack.png';
    themeProfile.src = 'bin/perfilBlack.png';
  } else {
    themeIcon.src = 'bin/LazarilloIconWhite.png';
    localStorage.setItem('theme', 'dark'); // Guarda el tema oscuro
    themeContrast.src = 'bin/tema.png';
    themeProfile.src = 'bin/perfil.png';
  }
});