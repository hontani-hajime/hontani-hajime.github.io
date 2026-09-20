const blogArticles = [
    { 
        title: "神戸文化祭のお知らせ", 
        date: "2025.10.31", 
        tags: [{name: "ボランティア", class: "tag-volunteer"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/2025103101/" 
    },
    { 
        title: "秋の気配を感じて", 
        date: "2026.09.06", 
        tags: [{name: "写真", class: "tag-photo"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/" 
    },
    { 
        title: "春の桜を撮りに行きました", 
        date: "2026.08.31", 
        tags: [{name: "写真", class: "tag-photo"}, {name: "旅行", class: "tag-travel"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/" 
    },
    { 
        title: "新しいサイトのポートフォリオを作成中", 
        date: "2026.08.20", 
        tags: [{name: "WEB・IT", class: "tag-webit"}, {name: "勉強", class: "tag-study"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/" 
    },
    { 
        title: "久しぶりのピアノ発表会に向けて", 
        date: "2026.08.15", 
        tags: [{name: "ピアノ", class: "tag-piano"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/" 
    },
    { 
        title: "日常のスケッチとカフェ巡り", 
        date: "2026.07.10", 
        tags: [{name: "その他", class: "tag-other"}], 
        img: "https://hontani-hajime.github.io/file/noimage.jpg", 
        url: "https://hontani-hajime.github.io/blog/" 
    }
];

// 日付（date）の降順（新しい順）に並び替える
blogArticles.sort((a, b) => (a.date < b.date ? 1 : -1));

// 最新の1件（配列の先頭）にのみ NEW (isNew = true) をつけ、それ以外は false にする
blogArticles.forEach((article, index) => {
    article.isNew = (index === 0);
});
