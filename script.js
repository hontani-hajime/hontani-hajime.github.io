document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. タイピングアニメーション（速度調整・一時停止対応）
    // ---------------------------------------------------
    const textPart1 = "本谷元";
    const textPart2 = "のはじめちゃんサイト";
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');
    const navElement = document.getElementById('global-nav');
    
    const typingSpeed = 150; // タイピング速度を遅く調整

    // 指定ミリ秒待機する関数
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(text) {
        for (let i = 0; i < text.length; i++) {
            typingTextElement.innerHTML += text.charAt(i);
            await sleep(typingSpeed);
        }
    }

    async function startTypingAnimation() {
        await sleep(500); // 最初のタメ
        
        // 「本谷元」まで入力
        await typeText(textPart1);
        
        // 一旦長めに止まる
        await sleep(1000); 
        
        // 「のはじめちゃんサイト」を入力
        await typeText(textPart2);

        // タイピング完了時の処理
        cursorElement.classList.remove('blinking');
        cursorElement.classList.add('done'); // PCでは点滅停止、スマホでは非表示になるクラス

        // PC幅の場合のみメニューをふわっと表示（スマホはハンバーガーの中なので透過度の操作は不要）
        if (window.innerWidth > 768) {
            navElement.style.opacity = '1';
        }
    }

    startTypingAnimation();


    // ---------------------------------------------------
    // 2. スマホ用ハンバーガーメニュー (2本線 ⇔ バツ印)
    // ---------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navElement.classList.toggle('is-open');
    });


    // ---------------------------------------------------
    // 3. ランダムギャラリー（3秒ごとに画像・形・配置がバラバラに変わる）
    // ---------------------------------------------------
    const galleryContainer = document.getElementById('hero-gallery');
    
    // 利用する画像のリスト (01.jpg 〜 12.jpg)
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // 用意した形のクラス（ここからランダムに選ぶ）
    const shapes = [
        'shape-square', 
        'shape-wide', 
        'shape-tall', 
        'shape-large', 
        'shape-circle', 
        'shape-circle-large'
    ];

    // 配列をシャッフルする関数
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // ギャラリーを生成・更新する関数
    function updateGallery() {
        // 更新前に全体をフェードアウト
        galleryContainer.classList.add('fade-out');

        setTimeout(() => {
            galleryContainer.innerHTML = ''; // 中身をリセット
            
            // 画像リストをシャッフルして、先頭からランダムな枚数（5〜7枚）取得
            const shuffledImages = shuffleArray([...allImages]);
            const displayCount = Math.floor(Math.random() * 3) + 5; 
            const selectedImages = shuffledImages.slice(0, displayCount);

            selectedImages.forEach(imgSrc => {
                const itemDiv = document.createElement('div');
                // ランダムな形を割り当て
                const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
                itemDiv.className = `gallery-item ${randomShape}`;

                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = "Gallery Photo";

                itemDiv.appendChild(img);
                galleryContainer.appendChild(itemDiv);
            });

            // フェードイン
            galleryContainer.classList.remove('fade-out');
        }, 500); // CSSの opacity 変化時間に合わせる
    }

    // 初回生成
    updateGallery();

    // 約3.5秒（3000ms表示 + 500msアニメーション考慮）ごとに更新
    setInterval(updateGallery, 3500);
});
