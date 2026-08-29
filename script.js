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
    // お知らせセクションの高さ自動調整 (PC版のみ)
    // =========================================================
    function adjustNewsHeight() {
        const isMobile = window.innerWidth <= 768;
        const newsSection = document.getElementById('news-section');
        const newsListContainer = document.getElementById('news-list-container');
        const gallery = document.getElementById('hero-gallery');
        const textElement = document.querySelector('.hero-text');

        if (!newsSection || !newsListContainer || !gallery || !textElement) return;

        if (isMobile) {
            // スマホ版はCSS側で表示件数を制御するため高さをリセット
            newsListContainer.style.maxHeight = '';
        } else {
            // PC版で「続きを見る」が押されていない場合
            if (!newsSection.classList.contains('is-expanded')) {
                const galleryHeight = gallery.offsetHeight;
                const textHeight = textElement.offsetHeight;
                const rowGap = 30; // .hero-section の row-gap
                
                // 右側の写真の下端を超えないための計算
                const availableHeight = galleryHeight - textHeight - rowGap;
                
                // ボタンの高さなどを考慮してリストコンテナの最大高さを決定
                const listContainerMaxHeight = availableHeight - 45; 
                
                if (listContainerMaxHeight > 100) {
                    newsListContainer.style.maxHeight = listContainerMaxHeight + 'px';
                } else {
                    newsListContainer.style.maxHeight = '150px'; // 最低限の高さ
                }
            } else {
                // 展開時は高さ制限を解除
                newsListContainer.style.maxHeight = 'none';
            }
        }
    }

    // 「続きを見る」ボタンのクリックイベント
    const moreBtn = document.getElementById('news-more-btn');
    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            document.getElementById('news-section').classList.add('is-expanded');
            adjustNewsHeight(); // 高さを再計算して展開
        });
    }

    // 画面サイズ変更時にお知らせの高さを再計算
    window.addEventListener('resize', adjustNewsHeight);

    // =========================================================
    // ギャラリー（4秒ごとに一斉切り替え、横3つ×縦2つの6枚構成）
    // =========================================================
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    const totalItems = 6;

    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function getNextImages(currentImages, count) {
        let newImages = [];
        let isValid = false;

        while (!isValid) {
            const shuffled = shuffleArray(allImages);
            newImages = shuffled.slice(0, count);

            isValid = true;
            for (let i = 0; i < count; i++) {
                if (currentImages[i] && newImages[i] === currentImages[i]) {
                    isValid = false; 
                    break;
                }
            }
        }
        return newImages;
    }

    function initGallery() {
        galleryContainer.innerHTML = '';

        const initialImages = getNextImages([], totalItems);

        for (let i = 0; i < totalItems; i++) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'gallery-item'; 

            const img = document.createElement('img');
            img.src = initialImages[i];
            img.alt = "Gallery Photo";

            itemDiv.appendChild(img);
            galleryContainer.appendChild(itemDiv);
        }

        // 画像がDOMに配置された直後にお知らせの高さを計算
        requestAnimationFrame(() => {
            adjustNewsHeight();
        });

        setInterval(() => {
            const imgs = galleryContainer.querySelectorAll('img');
            if (imgs.length === 0) return;

            const currentSrcs = Array.from(imgs).map(img => img.getAttribute('src'));
            const nextSrcs = getNextImages(currentSrcs, imgs.length);

            imgs.forEach(img => {
                img.style.opacity = '0';
            });

            setTimeout(() => {
                imgs.forEach((img, index) => {
                    img.src = nextSrcs[index];
                    img.style.opacity = '1';
                });
            }, 500); 
        }, 4000); 
    }

    initGallery();
});
