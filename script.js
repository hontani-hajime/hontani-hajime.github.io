document.addEventListener('DOMContentLoaded', () => {
    const textToType = "本谷元のはじめちゃんサイト";
    const typingTextElement = document.getElementById('typing-text');
    const navElement = document.getElementById('global-nav');
    
    // 早く入力してほしいとのご要望に合わせてスピードを速く設定 (ミリ秒)
    const typingSpeed = 50; 
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            // 1文字ずつ追加
            typingTextElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // タイピング完了後、右側のメニューバーをふわっと表示
            // カーソル「｜」はそのまま残り、点滅を続けます
            navElement.style.opacity = '1';
        }
    }

    // ページ読み込み後、少しだけ間を置いてからタイピングを開始する
    setTimeout(typeWriter, 300);
});
