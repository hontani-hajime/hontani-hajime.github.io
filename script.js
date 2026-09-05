document.addEventListener('DOMContentLoaded', () => {
    // タイピングアニメーション
    const textPart1 = "本谷元";
    const textPart2 = "のはじめちゃんサイト";
    const typingTextElement = documentdocument.addEventListener('DOMContentLoaded', () => {
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
    // ギャラリー
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
            }, 500); 
        }, 4000); 
    }

    initGallery();

    // =========================================================
    // スクロール検知イベント (フローティングメニュー、TOPボタン)
    // =========================================================
    const topBtn = document.getElementById('page-top-btn');
    const floatingNav = document.getElementById('floating-nav');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // TOPへ戻るボタンの表示・非表示
        if (scrollY > 300) {
            topBtn.classList.add('is-show');
        } else {
            topBtn.classList.remove('is-show');
        }

        // PC版の右上のフローティングメニュー表示
        if (window.innerWidth > 768 && scrollY > 200) {
            floatingNav.classList.add('is-show');
        } else {
            floatingNav.classList.remove('is-show');
        }
    });

    // クリックで上に戻る
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // =========================================================
    // ひょっこり画像のアニメーション (IntersectionObserver)
    // =========================================================
    const popImages = document.querySelectorAll('.pop-image');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2 // 要素が20%見えたら発火
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 画面内に入ったらクラスを付与して表示
                entry.target.classList.add('is-show');
            } else {
                // 画面外に出たらクラスを外して隠す（何度も繰り返し見たい場合）
                // 1回だけで良い場合は else のブロックを削除し、observer.unobserve(entry.target); を追加します
                entry.target.classList.remove('is-show');
            }
        });
    }, observerOptions);

    popImages.forEach(img => {
        observer.observe(img);
    });
});.getElementById('typing-text');
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
    // ギャラリー
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
            }, 500); 
        }, 4000); 
    }

    initGallery();

    // =========================================================
    // スクロール検知イベント (フローティングメニュー、ひょっこり画像、TOPボタン)
    // =========================================================
    const topBtn = document.getElementById('page-top-btn');
    const floatingNav = document.getElementById('floating-nav');
    const popImage = document.getElementById('pop-image');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // TOPへ戻るボタンの表示・非表示
        if (scrollY > 300) {
            topBtn.classList.add('is-show');
        } else {
            topBtn.classList.remove('is-show');
        }

        // PC版の右上のフローティングメニュー表示
        // 少しスクロールしたらヘッダーと入れ替わりで登場させる
        if (window.innerWidth > 768 && scrollY > 200) {
            floatingNav.classList.add('is-show');
        } else {
            floatingNav.classList.remove('is-show');
        }

        // ひょっこりはじめちゃんの表示 (ページをある程度スクロールしたら)
        if (scrollY > 600) {
            popImage.classList.add('is-show');
        } else {
            popImage.classList.remove('is-show');
        }
    });

    // クリックで上に戻る
    topBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
