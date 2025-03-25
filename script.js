document.addEventListener("DOMContentLoaded", () => {
    // 初始化，添加事件监听等
    console.log("记账网页已加载");

    // 示例：用户登录
    const loginButton = document.querySelector("#loginButton");
    loginButton.addEventListener("click", () => {
        // 这里可以接入 Supabase 的登录功能
        alert("登录功能待实现");
    });
});
