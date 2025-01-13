function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // 簡単な認証情報
    const validUsername = "admin";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        // ログイン成功時、認証フラグを保存してリダイレクト
        localStorage.setItem("authenticated", "true");
        window.location.href = "protected.html";
    } else {
        // エラーメッセージを表示
        document.getElementById("error").innerText = "ユーザー名またはパスワードが間違っています。";
    }
}

// 保護されたページにアクセスする際の認証チェック
if (window.location.pathname.endsWith("protected.html")) {
    const isAuthenticated = localStorage.getItem("authenticated");
    if (!isAuthenticated) {
        // 認証されていない場合、ログインページにリダイレクト
        window.location.href = "index.html";
    }
}
