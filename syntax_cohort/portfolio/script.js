const toggleBtn = document.getElementById('theme-toggle');

toggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
  toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});