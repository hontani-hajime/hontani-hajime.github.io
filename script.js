document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu-item');
  const contentHeader = document.getElementById('content-title');
  const contentFrame = document.getElementById('content-frame');

  const pathMap = {
    'トップ': '/top',
    'カレンダー': '/calendar',
    '生活記録表': '/life',
    '貸し借りの記録': '/companionship',
    'データベース': '/database',
    '成績管理': '/grades',
    'パスワード一覧': '/password',
    'アプリ一覧': '/app',
    'メモ帳': '/memo',
    'マニュアル': '/manual'
  };

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent.trim();
      contentHeader.textContent = text;
      contentFrame.src = pathMap[text] || '/top';
    });
  });
});
