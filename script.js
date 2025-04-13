document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const contentHeader = document.getElementById('content-title');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      contentHeader.textContent = text; // ← 薄茶エリアにメニュー名を表示！
    });
  });
});
