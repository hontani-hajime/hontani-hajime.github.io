document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // タイピングアニメーション
    // =========================================================
    const textPart1 = "本谷元";
    const textPart2 = "のはじめちゃんサイト";
    const typingTextElement = document.getElementById('typing-text');
    const cursorElement = document.getElementById('cursor');

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
    }
    startTypingAnimation();

    // =========================================================
    // スマホ用ハンバーガーメニュー
    // =========================================================
    const hamburger = document.getElementById('hamburger');
    const fullscreenNav = document.getElementById('fullscreen-nav');
    
    // フルスクリーンメニュー内のリンクをクリックしたら閉じる処理を追加
    const fullscreenLinks = fullscreenNav.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        fullscreenNav.classList.toggle('is-open');
    });

    fullscreenLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            fullscreenNav.classList.remove('is-open');
        });
    });

    // =========================================================
    // スクロール検知 (PC版追従メニュー ＆ TOPボタン)
    // =========================================================
    const floatingMenu = document.getElementById('floating-menu');
    const topBtn = document.getElementById('page-top-btn');
    const header = document.querySelector('.site-header');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // 1. PC用フローティングメニューの表示制御
        if (window.innerWidth > 768 && floatingMenu) {
             const headerHeight = header.offsetHeight;
             if (scrollY > headerHeight) {
                 floatingMenu.classList.add('is-visible');
             } else {
                 floatingMenu.classList.remove('is-visible');
             }
        }

        // 2. TOPへ戻るボタンの表示制御
        if (scrollY > 300) {
            topBtn.classList.add('is-show');
        } else {
            topBtn.classList.remove('is-show');
        }
    });

    // TOPへ戻るクリックイベント
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =========================================================
    // 「ヒョコッと出るイラスト」のスクロール連動アニメーション
    // Intersection Observer を使用
    // =========================================================
    const hyokoElements = document.querySelectorAll('.hyoko-illust');
    
    // 画面内に20%入ってきたら発火する設定
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画面に入ったらクラスを付けてアニメーション発動
                entry.target.classList.add('is-visible');
            } else {
                // 画面から出たらクラスを外す（スクロールするたびに何度でもヒョコッと出るように）
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    hyokoElements.forEach(el => observer.observe(el));


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
            newsListContainer.style.maxHeight = '';
        } else {
            if (!newsSection.classList.contains('is-expanded')) {
                const galleryHeight = gallery.offsetHeight;
                const textHeight = textElement.offsetHeight;
                const rowGap = 30; 

                const availableHeight = galleryHeight - textHeight - rowGap;
                const listContainerMaxHeight = availableHeight - 75; 

                if (listContainerMaxHeight > 100) {
                    newsListContainer.style.maxHeight = listContainerMaxHeight + 'px';
                } else {
                    newsListContainer.style.maxHeight = '150px'; 
                }
            } else {
                newsListContainer.style.maxHeight = 'none';
            }
        }
    }

    const moreBtn = document.getElementById('news-more-btn');
    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            document.getElementById('news-section').classList.add('is-expanded');
            adjustNewsHeight(); 
        });
    }

    window.addEventListener('resize', adjustNewsHeight);

    // =========================================================
    // ギャラリー (自動切り替え)
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
        if(!galleryContainer) return;

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

        setTimeout(() => {
            adjustNewsHeight();
        }, 100);

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
            }, 600); // フェード時間をCSS(0.6s)に合わせました
        }, 4000); 
    }

    initGallery();
});
