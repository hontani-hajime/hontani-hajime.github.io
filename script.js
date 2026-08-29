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
    // ギャラリー（枠は固定し、中の画像だけが個別にランダムで切り替わる）
    // =========================================================
    const galleryContainer = document.getElementById('hero-gallery');
    const allImages = Array.from({length: 12}, (_, i) => `file/${String(i + 1).padStart(2, '0')}.jpg`);
    
    // PC・タブレット用(6列×2行)のレイアウトパターン（高さを半分に抑えました）
    const layoutsPC = [
        ['item-2x2', 'item-2x1', 'item-1x1', 'item-1x1', 'item-2x1', 'item-1x1', 'item-1x1'],
        ['item-1x2', 'item-2x2', 'item-1x1', 'item-1x1', 'item-1x2', 'item-1x1', 'item-1x1'],
        ['item-2x1', 'item-2x1', 'item-2x1', 'item-2x1', 'item-2x1', 'item-1x1', 'item-1x1']
    ];

    // スマホ用(3列×4行)のレイアウトパターン（そのままキープ）
    const layoutsSP = [
        ['item-2x2', 'item-1x1', 'item-1x1', 'item-1x1', 'item-2x1', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-1x1', 'item-2x1', 'item-1x2', 'item-2x2', 'item-1x1', 'item-1x1', 'item-1x1'],
        ['item-1x1', 'item-1x1', 'item-1x1', 'item-2x2', 'item-1x2', 'item-2x1', 'item-1x1']
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

    // 初回のギャラリー枠を構築する関数
    function initGallery() {
        galleryContainer.innerHTML = '';
        
        const isMobile = window.innerWidth <= 768;
        const layouts = isMobile ? layoutsSP : layoutsPC;
        
        // ページ読み込み時にレイアウトを1つ決めて固定する
        const baseLayout = layouts[Math.floor(Math.random() * layouts.length)];
        
        // 枠の順番はシャッフルせずそのまま使い、中に入る画像だけをシャッフルします
        // （枠がはみ出して縦長になってしまうのを防ぎます）
        const shuffledImages = shuffleArray(allImages);
        
        baseLayout.forEach((shapeClass, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `gallery-item ${shapeClass}`;

            const img = document.createElement('img');
            // 画像をランダムに設定（用意した写真から順番に割り当て）
            img.src = shuffledImages[index % shuffledImages.length];
            img.alt = "Gallery Photo";

            itemDiv.appendChild(img);
            galleryContainer.appendChild(itemDiv);

            // この枠の中の画像を個別に切り替えるループを開始
            startRandomImageCycle(img);
        });
    }

    // それぞれの画像が2秒〜5秒の間隔でフェードして切り替わる処理
    function startRandomImageCycle(imgElement) {
        // 2000ms(2秒) 〜 5000ms(5秒) の間でランダムな時間を設定
        const nextTime = Math.floor(Math.random() * 3000) + 2000;
        
        setTimeout(() => {
            // まず画像をフェードアウトさせる（透明にする）
            imgElement.style.opacity = '0';
            
            // CSSのフェードアウト時間(0.5秒)を待ってから画像を差し替える
            setTimeout(() => {
                let newSrc;
                // 今表示されている写真とは違う写真が選ばれるまでループ
                do {
                    newSrc = allImages[Math.floor(Math.random() * allImages.length)];
                } while (imgElement.getAttribute('src') === newSrc);
                
                imgElement.src = newSrc;
                
                // 新しい画像をフェードインさせる
                imgElement.style.opacity = '1';
                
                // 切り替え終わったら、再びランダムなタイマーをセット（繰り返し）
                startRandomImageCycle(imgElement);
            }, 500); // 500ミリ秒 = CSSのtransitionの時間
            
        }, nextTime);
    }

    // 実行
    initGallery();
});
