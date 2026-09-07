document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const main = document.querySelector('.main-content');

    const headerHTML = `
        <div class="top-line"></div>
        <header class="site-header">
            <div class="header-inner">
                <div class="logo-area">
                    <a href="https://hontani-hajime.github.io/">
                        <img src="https://hontani-hajime.github.io/file/icon.jpg" alt="アイコン" class="site-logo">
                    </a>
                    <div class="site-titles">
                        <a href="https://hontani-hajime.github.io/" style="text-decoration: none; color: inherit;">
                            <h1 class="main-title font-bold">
                                <span id="typing-text"></span><span id="cursor" class="blinking">｜</span>
                            </h1>
                        </a>
                        <p class="sub-title">Hajime Hontani's Hajime-chan Site</p>
                    </div>
                </div>
                <div class="hamburger" id="hamburger">
                    <span></span>
                    <span></span>
                </div>
                <nav class="global-nav" id="global-nav">
                    <ul>
                        <li>
                            <a href="https://hontani-hajime.github.io/profile/" class="hover-marker mark-pink">
                                <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile
                            </a>
                        </li>
                        <li>
                            <a href="https://hontani-hajime.github.io/blog/" class="hover-marker mark-green">
                                <svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> Blog
                            </a>
                        </li>
                        <li>
                            <a href="https://hontani-hajime.github.io/photos/" class="hover-marker mark-orange">
                                <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> Photos
                            </a>
                        </li>
                        <li>
                            <a href="https://hontani-hajime.github.io/web-works/" class="hover-marker mark-purple">
                                <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> Web Works
                            </a>
                        </li>
                        <li class="sns-list">
                            <a href="https://www.instagram.com/hajimechandayon" target="_blank" rel="noopener noreferrer" class="sns-link">
                                <div class="sns-circle"><img src="https://hontani-hajime.github.io/file/instagram.jpg" alt="Instagram" class="sns-icon"></div>
                            </a>
                            <a href="https://www.linkedin.com/in/hontani-hajime/" target="_blank" rel="noopener noreferrer" class="sns-link">
                                <div class="sns-circle"><img src="https://hontani-hajime.github.io/file/linkedIn.jpg" alt="LinkedIn" class="sns-icon"></div>
                            </a>
                            <a href="https://jp.pinterest.com/hontanihajime/" target="_blank" rel="noopener noreferrer" class="sns-link">
                                <div class="sns-circle"><img src="https://hontani-hajime.github.io/file/pinterest.jpg" alt="Pinterest" class="sns-icon"></div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        <nav class="floating-nav" id="floating-nav">
            <ul>
                <li>
                    <a href="https://hontani-hajime.github.io/profile/" class="hover-marker mark-pink">
                        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> Profile
                    </a>
                </li>
                <li>
                    <a href="https://hontani-hajime.github.io/blog/" class="hover-marker mark-green">
                        <svg viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg> Blog
                    </a>
                </li>
                <li>
                    <a href="https://hontani-hajime.github.io/photos/" class="hover-marker mark-orange">
                        <svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg> Photos
                    </a>
                </li>
                <li>
                    <a href="https://hontani-hajime.github.io/web-works/" class="hover-marker mark-purple">
                        <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg> Web Works
                    </a>
                </li>
            </ul>
        </nav>
    `;

    const footerHTML = `
        <footer class="site-footer">
            <div class="footer-inner">
                <a href="https://hontani-hajime.github.io/" class="footer-logo-link">
                    <img src="https://hontani-hajime.github.io/file/icon.jpg" alt="アイコン" class="footer-logo">
                    <span class="font-bold">本谷元のはじめちゃんサイト</span>
                </a>
                <ul class="footer-links">
                    <li><a href="https://hontani-hajime.github.io/site-policy/">サイトポリシー</a></li>
                    <li><a href="https://hontani-hajime.github.io/privacy-policy/">プライバシーポリシー</a></li>
                </ul>
                <p class="copyright">&copy; 2026 Hontani Hajime.</p>
            </div>
        </footer>
    `;

    const headerContainer = document.createElement('div');
    headerContainer.id = 'header-container';
    headerContainer.innerHTML = headerHTML;
    body.insertBefore(headerContainer, main || body.firstChild);

    const footerContainer = document.createElement('div');
    footerContainer.id = 'footer-container';
    footerContainer.innerHTML = footerHTML;
    body.appendChild(footerContainer);

    const topBtn = document.createElement('button');
    topBtn.id = 'page-top-btn';
    topBtn.className = 'page-top-btn';
    topBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
        <span class="font-bold">TOP</span>
    `;
    body.appendChild(topBtn);

    initSite();
});

function initSite() {
    const t1 = "本谷元";
    const t2 = "のはじめちゃんサイト";
    const tgt = document.getElementById('typing-text');
    const cur = document.getElementById('cursor');
    const nav = document.getElementById('global-nav');

    if (tgt && cur && nav) {
        const wait = (m) => new Promise(r => setTimeout(r, m));

        async function typeAnim() {
            await wait(500);
            for (let i = 0; i < t1.length; i++) {
                tgt.innerHTML += t1.charAt(i);
                await wait(150);
            }
            await wait(1000); 
            for (let i = 0; i < t2.length; i++) {
                tgt.innerHTML += t2.charAt(i);
                await wait(150);
            }
            cur.classList.remove('blinking');
            cur.classList.add('done');
            if (window.innerWidth > 768) nav.style.opacity = '1';
        }
        typeAnim();
    }

    const ham = document.getElementById('hamburger');
    if (ham && nav) {
        ham.addEventListener('click', () => {
            ham.classList.toggle('is-active');
            nav.classList.toggle('is-open');
        });
    }

    function fixNews() {
        const mbl = window.innerWidth <= 768;
        const sec = document.getElementById('news-section');
        const box = document.getElementById('news-list-container');
        const gal = document.getElementById('hero-gallery');
        const txt = document.querySelector('.hero-text');

        if (!sec || !box || !gal || !txt) return;

        if (mbl) {
            box.style.maxHeight = '';
        } else {
            if (!sec.classList.contains('is-expanded')) {
                const gh = gal.offsetHeight;
                const th = txt.offsetHeight;
                const h = gh - th - 30 - 75; 
                box.style.maxHeight = (h > 100 ? h : 150) + 'px';
            } else {
                box.style.maxHeight = 'none';
            }
        }
    }

    const mb = document.getElementById('news-more-btn');
    if (mb) {
        mb.addEventListener('click', () => {
            document.getElementById('news-section').classList.add('is-expanded');
            fixNews(); 
        });
    }

    window.addEventListener('resize', fixNews);

    const gc = document.getElementById('hero-gallery');
    if (gc) {
        const imgs = Array.from({length: 12}, (_, i) => `https://hontani-hajime.github.io/file/${String(i + 1).padStart(2, '0')}.jpg`);

        function mix(a) {
            let b = [...a];
            for (let i = b.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [b[i], b[j]] = [b[j], b[i]];
            }
            return b;
        }

        function getNext(curr, c) {
            let res = [];
            let ok = false;
            while (!ok) {
                let s = mix(imgs);
                res = s.slice(0, c);
                ok = true;
                for (let i = 0; i < c; i++) {
                    if (curr[i] && res[i] === curr[i]) {
                        ok = false; break;
                    }
                }
            }
            return res;
        }

        function setupGal() {
            gc.innerHTML = '';
            let init = getNext([], 6);
            for (let i = 0; i < 6; i++) {
                let d = document.createElement('div');
                d.className = 'gallery-item'; 
                let im = document.createElement('img');
                im.src = init[i];
                d.appendChild(im);
                gc.appendChild(d);
            }

            setTimeout(fixNews, 100);

            setInterval(() => {
                let ch = gc.querySelectorAll('img');
                if (ch.length === 0) return;
                let cr = Array.from(ch).map(img => img.getAttribute('src'));
                let nx = getNext(cr, ch.length);

                ch.forEach(img => img.style.opacity = '0');
                setTimeout(() => {
                    ch.forEach((img, idx) => {
                        img.src = nx[idx];
                        img.style.opacity = '1';
                    });
                }, 500); 
            }, 4000); 
        }
        setupGal();
    }

    setTimeout(() => {
        const m1 = document.querySelector('.js-marker:not(.js-marker-delay)');
        const m2 = document.querySelector('.js-marker-delay');
        if(m1) m1.classList.add('is-active');
        
        setTimeout(() => {
            if(m2) m2.classList.add('is-active');
        }, 1500); 
    }, 800);

    const tb = document.getElementById('page-top-btn');
    const fn = document.getElementById('floating-nav');
    
    window.addEventListener('scroll', () => {
        let y = window.scrollY;
        if (tb) {
            if (y > 300) tb.classList.add('is-show');
            else tb.classList.remove('is-show');
        }
        if (fn) {
            if (window.innerWidth > 768 && y > 200) fn.classList.add('is-show');
            else fn.classList.remove('is-show');
        }
    });

    if (tb) {
        tb.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const blogArticles = [
        { title: "秋の気配を感じて", date: "2026.09.06", tags: [{name: "写真", class: "tag-photo"}], isNew: true, img: "https://hontani-hajime.github.io/file/noimage.jpg" },
        { title: "春の桜を撮りに行きました", date: "2026.08.31", tags: [{name: "写真", class: "tag-photo"}, {name: "旅行", class: "tag-travel"}], isNew: false, img: "https://hontani-hajime.github.io/file/noimage.jpg" },
        { title: "新しいサイトのポートフォリオを作成中", date: "2026.08.20", tags: [{name: "WEB・IT", class: "tag-webit"}, {name: "勉強", class: "tag-study"}], isNew: false, img: "https://hontani-hajime.github.io/file/noimage.jpg" },
        { title: "久しぶりのピアノ発表会に向けて", date: "2026.08.15", tags: [{name: "ピアノ", class: "tag-piano"}], isNew: false, img: "https://hontani-hajime.github.io/file/noimage.jpg" },
        { title: "日常のスケッチとカフェ巡り", date: "2026.07.10", tags: [{name: "その他", class: "tag-other"}], isNew: false, img: "https://hontani-hajime.github.io/file/noimage.jpg" }
    ];

    const mainArea = document.getElementById('blog-main-area');
    const listInner = document.getElementById('blog-list-inner');

    if (mainArea && listInner) {
        let currentArticles = [...blogArticles];

        function renderBlog() {
            const main = currentArticles[0];
            mainArea.innerHTML = `
                <a href="https://hontani-hajime.github.io/blog/" class="blog-main-link" style="display: flex; flex-direction: column; height: 100%; text-decoration: none; color: inherit;">
                    <div class="blog-main-img-wrapper">
                        ${main.isNew ? '<span class="new-badge">NEW</span>' : ''}
                        <img src="${main.img}" alt="Blog Image">
                    </div>
                    <div class="blog-main-info">
                        <span class="blog-date">${main.date}</span>
                        <h3 class="blog-title font-bold">${main.title}</h3>
                        <div class="blog-tags">
                            ${main.tags.map(t => `<span class="blog-tag ${t.class}">${t.name}</span>`).join('')}
                        </div>
                    </div>
                </a>
            `;

            listInner.innerHTML = currentArticles.slice(1).map(article => `
                <a href="https://hontani-hajime.github.io/blog/" class="blog-list-item">
                    <div class="blog-list-img-wrapper">
                        ${article.isNew ? '<span class="list-new-badge">NEW</span>' : ''}
                        <img src="${article.img}" alt="Blog Image">
                    </div>
                    <div class="blog-list-info">
                        <span class="blog-list-date">${article.date}</span>
                        <h4 class="blog-list-title font-bold">${article.title}</h4>
                        <div class="blog-list-tags">
                            ${article.tags.map(t => `<span class="blog-tag ${t.class}">${t.name}</span>`).join('')}
                        </div>
                    </div>
                </a>
            `).join('');
        }

        renderBlog();

        setInterval(() => {
            mainArea.classList.add('is-hidden');
            
            const nextLastArticle = currentArticles[0];
            const tempItem = document.createElement('a');
            tempItem.href = "https://hontani-hajime.github.io/blog/";
            tempItem.className = "blog-list-item";
            tempItem.innerHTML = `
                <div class="blog-list-img-wrapper">
                    ${nextLastArticle.isNew ? '<span class="list-new-badge">NEW</span>' : ''}
                    <img src="${nextLastArticle.img}" alt="Blog Image">
                </div>
                <div class="blog-list-info">
                    <span class="blog-list-date">${nextLastArticle.date}</span>
                    <h4 class="blog-list-title font-bold">${nextLastArticle.title}</h4>
                    <div class="blog-list-tags">
                        ${nextLastArticle.tags.map(t => `<span class="blog-tag ${t.class}">${t.name}</span>`).join('')}
                    </div>
                </div>
            `;
            listInner.appendChild(tempItem);
            
            const firstItem = listInner.querySelector('.blog-list-item');
            if (firstItem) {
                const itemHeight = firstItem.offsetHeight + 15; 
                listInner.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
                listInner.style.transform = `translateY(-${itemHeight}px)`;
            }

            setTimeout(() => {
                currentArticles.push(currentArticles.shift());
                renderBlog();
                
                listInner.style.transition = 'none';
                listInner.style.transform = 'translateY(0)';
                
                mainArea.classList.remove('is-hidden');
            }, 500); 

        }, 4000);
    }
}
