document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const contentInner = document.querySelector('.content-inner');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      contentInner.innerHTML = `<p>${text}</p>`;
    });
  });
});
