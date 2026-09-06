document.addEventListener('DOMContentLoaded', async () => {
    const hc = document.getElementById('header-container');
    const fc = document.getElementById('footer-container');

    if (hc) {
        const hr = await fetch('https://hontani-hajime.github.io/header.html');
        hc.innerHTML = await hr.text();
    }
    if (fc) {
        const fr = await fetch('https://hontani-hajime.github.io/footer.html');
        fc.innerHTML = await fr.text();
    }

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

    /* ーーー ここから新規追加：Blogスライダーの機能 ーーー */
    const blogSlider = document.getElementById('blog-slider');
    if (blogSlider) {
        // ブログのデータ。後で記事を増やすときもここに追加・変更すればOKです。
        const blogs = [
            { date: "2026.08.31", title: "春の桜を撮りに行きました", tags: '<span class="blog-tag tag-photo">写真</span><span class="blog-tag tag-travel">旅行</span>', isNew: true },
            { date: "2026.08.20", title: "新しいサイトのポートフォリオを作成中", tags: '<span class="blog-tag tag-webit">WEB・IT</span><span class="blog-tag tag-study">勉強</span>', isNew: false },
            { date: "2026.08.15", title: "久しぶりのピアノ発表会に向けて", tags: '<span class="blog-tag tag-piano">ピアノ</span>', isNew: false }
        ];

        // データを元にHTMLを組み立てて配置
        blogs.forEach((b, i) => {
            let card = document.createElement('a');
            card.href = "https://hontani-hajime.github.io/blog/";
            // 0番目をメイン、それ以外をリストとしてクラスを付与
            card.className = `blog-slide-card pos-${i === 0 ? 'main' : 'list-' + i}`;
            card.setAttribute('data-index', i);
            
            let newBadge = b.isNew ? '<span class="new-badge">NEW</span>' : '';

            card.innerHTML = `
                <div class="blog-img-wrapper">
                    <img src="https://hontani-hajime.github.io/file/noimage.jpg" alt="Blog Image">
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        ${newBadge}
                        <span class="blog-date">${b.date}</span>
                    </div>
                    <h3 class="blog-title font-bold">${b.title}</h3>
                    <div class="blog-tags">${b.tags}</div>
                </div>
            `;
            blogSlider.appendChild(card);
        });

        // 4秒ごとのスライド処理
        let currentOrder = [0, 1, 2]; // 0がmain, 1が上リスト, 2が下リスト
        setInterval(() => {
            // 順番をひとつずらす (例: [0, 1, 2] -> [1, 2, 0])
            let first = currentOrder.shift();
            currentOrder.push(first);

            // ズレた順番に合わせてクラスを付け替えると、CSSアニメーションで動く
            const cards = blogSlider.querySelectorAll('.blog-slide-card');
            cards.forEach(card => {
                let index = parseInt(card.getAttribute('data-index'));
                let posIndex = currentOrder.indexOf(index);
                card.className = `blog-slide-card pos-${posIndex === 0 ? 'main' : 'list-' + posIndex}`;
            });
        }, 4000);
    }
}
