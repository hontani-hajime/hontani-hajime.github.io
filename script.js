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
    // ギャラリー（4秒ごとに一斉に切り替わり、重複や連続を防止）
    // =========================================================
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // PC・iPad(横長)用: すべて同じ大きさの四角形が6つ (3列×2行)
    const layoutsPC = [
        ['item-1x1', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1', 'item-1x1']
    ];

    // スマホ用: 指定されたピッタリ埋まるレイアウト（余白なし！）
    // 大きな四角形(左上)、小(右上)、小(右中)、小(左下)、横長(右下)
    const layoutsSP = [
        ['item-2x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-2x1']
    ];

    // 配列をシャッフルする関数
    function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // 「画面内で重複しない」＆「各場所で前回と同じ写真にならない」画像の組み合わせを作る関数
    function getNextImages(currentImages, count) {
        let newImages = [];
        let isValid = false;
        
        while (!isValid) {
            // 全12枚からランダムにシャッフルして、必要な枚数だけ取り出す
            const shuffled = shuffleArray(allImages);
            newImages = shuffled.slice(0, count);
            
            isValid = true;
            // それぞれの場所で、前回と同じ写真が連続していないかチェック
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
        
        const isMobile = window.innerWidth <= 768;
        const layouts = isMobile ? layoutsSP : layoutsPC;
        const baseLayout = layouts[Math.floor(Math.random() * layouts.length)];
        
        // 初回の画像をセット
        const initialImages = getNextImages([], baseLayout.length);
        
        baseLayout.forEach((shapeClass, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `gallery-item ${shapeClass}`;

            const img = document.createElement('img');
            img.src = initialImages[index];
            img.alt = "Gallery Photo";

            itemDiv.appendChild(img);
            galleryContainer.appendChild(itemDiv);
        });

        // 4000ミリ秒(4秒)ごとに一斉に切り替えるループ
        setInterval(() => {
            const imgs = galleryContainer.querySelectorAll('img');
            if (imgs.length === 0) return;

            // 今表示されている画像のリストを取得
            const currentSrcs = Array.from(imgs).map(img => img.getAttribute('src'));
            // 条件を満たした新しい画像のリストを作成
            const nextSrcs = getNextImages(currentSrcs, imgs.length);

            // ① まず全部の画像を同時にフェードアウト
            imgs.forEach(img => {
                img.style.opacity = '0';
            });

            // ② 0.5秒後（CSSのフェードアウト完了後）に写真を差し替えてフェードイン
            setTimeout(() => {
                imgs.forEach((img, index) => {
                    img.src = nextSrcs[index];
                    img.style.opacity = '1';
                });
            }, 500); 

        }, 4000); // 4秒に変更！
    }

    initGallery();
});
