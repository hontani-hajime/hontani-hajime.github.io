document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------
    // 1. タイピングアニメーション
    // ---------------------------------------------------
    const textPart1 = "本谷元";
    const textPart2 = "のはじめちゃんサイト";
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');
    const navElement = document.getElementById('global-nav');
    
    const typingSpeed = 150; 

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function typeText(text) {
        for (let i = 0; i < text.length; i++) {
            typingTextElement.innerHTML += text.charAt(i);
            await sleep(typingSpeed);
        }
    }

    async function startTypingAnimation() {
        await sleep(500);
        await typeText(textPart1);
        await sleep(1000); 
        await typeText(textPart2);

        cursorElement.classList.remove('blinking');
        cursorElement.classList.add('done');

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
    // 3. ランダムギャラリー（余白なくピッタリ埋まる仕様）
    // ---------------------------------------------------
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // 全12マス（PC:4x3, スマホ:3x4）をピッタリ使い切るためのレイアウトパターン（丸と四角混合）
    const layouts = [
        ['item-2x2-circle', 'item-2x1', 'item-2x1', 'item-1x2', 'item-1x1-circle', 'item-1x1'], // パターン1
        ['item-2x2', 'item-1x2', 'item-1x2', 'item-1x1-circle', 'item-1x1', 'item-1x1', 'item-1x1-circle'], // パターン2
        ['item-2x1', 'item-2x1', 'item-2x1', 'item-1x2', 'item-1x1-circle', 'item-1x1-circle', 'item-1x1', 'item-1x1'] // パターン3
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
            
            // 3つのパターンからランダムに1つ選び、配置順をシャッフル
            const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
            const shuffledLayout = shuffleArray(randomLayout);
            
            // 画像リストもシャッフルして必要な枚数取得
            const shuffledImages = shuffleArray(allImages).slice(0, shuffledLayout.length);

            shuffledLayout.forEach((shapeClass, index) => {
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
