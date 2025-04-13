document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const contentInner = document.querySelector('.content-inner');
  const contentHeader = document.getElementById('content-title');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      contentHeader.textContent = text;
      contentInner.innerHTML = `<p>${text}</p>`;
    });
  });
});
