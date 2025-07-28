// Force dark theme immediately before React loads
(function() {
  // Set the theme attribute on the HTML element
  document.documentElement.setAttribute('data-theme', 'dark');
  
  // Clear any existing theme localStorage
  try {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', 'dark');
  } catch (e) {
    // localStorage might not be available
  }
  
  // Add a class to ensure dark mode styles are applied
  document.documentElement.classList.add('theme-dark');
  document.documentElement.classList.remove('theme-light');
})();
