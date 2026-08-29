document.addEventListener('DOMContentLoaded', () => {
    // タイピングアニメーション
    const textPart1 = "本谷元";
    const textPart2 = "のはじめちゃんサイト";
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');
    const navElement = document.getElementById('global-nav');
    
    const typingSpeed = 150; 
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function startTypingAnimation() {
        await sleep(500);
        for (let i = 0; i < textPart1.length; i++) {
            typingTextElement.innerHTML += textPart1.charAt(i);
            await sleep(typingSpeed);
        }
        await sleep(1000); 
        for (let i = 0; i < textPart2.length; i++) {
            typingTextElement.innerHTML += textPart2.charAt(i);
            await sleep(typingSpeed);
        }
        cursorElement.classList.remove('blinking');
        cursorElement.classList.add('done');
        if (window.innerWidth > 768) navElement.style.opacity = '1';
    }
    startTypingAnimation();

    // ハンバーガーメニュー
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navElement.classList.toggle('is-open');
    });

    // =========================================================
    // 【改良版】空白が絶対にできないパズル配置ギャラリー
    // =========================================================
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // PC用(4列x3行)でピッタリはまる組み合わせパターン
    const layoutsPC = [
        ['item-2x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1', 'item-2x1', 'item-1x1', 'item-1x1'],
        ['item-1x2', 'item-2x2', 'item-1x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-2x1', 'item-2x1', 'item-1x1', 'item-2x2', 'item-1x1', 'item-1x1', 'item-1x1']
    ];

    // スマホ用(3列x4行)でピッタリはまる組み合わせパターン
    const layoutsSP = [
        ['item-2x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-2x1', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-1x1', 'item-2x1', 'item-1x2', 'item-2x2', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-1x1', 'item-1x1', 'item-1x1', 'item-2x2', 'item-1x2', 'item-2x1', 'item-1x1']
    ];

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function updateGallery() {
        galleryContainer.classList.add('fade-out');

        setTimeout(() => {
            galleryContainer.innerHTML = '';
            
            // 画面サイズに応じて、隙間ができない完璧なレイアウトを選択
            const isMobile = window.innerWidth <= 768;
            const layouts = isMobile ? layoutsSP : layoutsPC;
            
            // レイアウトパターンを1つ選び、順序をシャッフル
            const baseLayout = layouts[Math.floor(Math.random() * layouts.length)];
            const shuffledLayout = shuffleArray(baseLayout);
            
            // 画像もシャッフルして必要な枚数取得
            const shuffledImages = shuffleArray(allImages).slice(0, shuffledLayout.length);

            // 配置する図形の中で、正方形(1x1, 2x2)のものはランダムで50%の確率で綺麗な「丸」にする
            const finalLayout = shuffledLayout.map(cls => {
                if (cls === 'item-1x1' || cls === 'item-2x2') {
                    return Math.random() > 0.5 ? cls + '-circle' : cls;
                }
                return cls; // 横長・縦長はそのまま
            });

            finalLayout.forEach((shapeClass, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = `gallery-item ${shapeClass}`;

                const img = document.createElement('img');
                img.src = shuffledImages[index];
                img.alt = "Gallery Photo";

                itemDiv.appendChild(img);
                galleryContainer.appendChild(itemDiv);
            });

            galleryContainer.classList.remove('fade-out');
        }, 500);
    }

    updateGallery();
    setInterval(updateGallery, 3500);
});
