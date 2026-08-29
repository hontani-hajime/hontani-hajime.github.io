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
    // 全て角丸四角形だけで構成し、伸縮しながら入れ替わるギャラリー
    // =========================================================
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // PC用(4列)で100%隙間なく綺麗に埋まる四角形パターンの組み合わせ
    const layoutsPC = [
        ['item-2x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1', 'item-2x1', 'item-1x1', 'item-1x1'],
        ['item-1x2', 'item-2x2', 'item-1x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-2x1', 'item-2x1', 'item-1x1', 'item-2x2', 'item-1x1', 'item-1x1', 'item-1x1']
    ];

    // スマホ用(3列)で100%隙間なく綺麗に埋まる四角形パターンの組み合わせ
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
        // 一旦縮みながらフェードアウト
        galleryContainer.classList.add('is-animating');

        setTimeout(() => {
            galleryContainer.innerHTML = '';
            
            const isMobile = window.innerWidth <= 768;
            const layouts = isMobile ? layoutsSP : layoutsPC;
            
            const baseLayout = layouts[Math.floor(Math.random() * layouts.length)];
            const shuffledLayout = shuffleArray(baseLayout);
            const shuffledImages = shuffleArray(allImages).slice(0, shuffledLayout.length);

            shuffledLayout.forEach((shapeClass, index) => {
                const itemDiv = document.createElement('div');
                // すべて角丸の四角形クラスのみを適用
                itemDiv.className = `gallery-item ${shapeClass}`;

                const img = document.createElement('img');
                img.src = shuffledImages[index];
                img.alt = "Gallery Photo";

                itemDiv.appendChild(img);
                galleryContainer.appendChild(itemDiv);
            });

            // 拡大しながらフェードイン
            galleryContainer.classList.remove('is-animating');
        }, 400);
    }

    updateGallery();
    setInterval(updateGallery, 3500);
});
