document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const contentHeader = document.getElementById('content-title');
  const contentFrame = document.getElementById('content-frame');

  const routeMap = {
    "トップ": "/top",
    "カレンダー": "/calendar",
    "生活記録表": "/life"
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      contentHeader.textContent = text;

      if (routeMap[text]) {
        contentFrame.src = routeMap[text];
      } else {
        contentFrame.src = "/top"; // 未定義ならトップ
      }
    });
  });

  // 初期表示設定
  contentHeader.textContent = "トップ";
  contentFrame.src = "/top";
});
