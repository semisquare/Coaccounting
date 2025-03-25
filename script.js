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

async function loadExpenses() {
    const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', supabase.auth.user().id);  // 仅获取当前用户的记账记录

    if (error) {
        alert("获取记账记录失败：" + error.message);
        return;
    }

    const expenseList = document.querySelector("#expenseList");
    expenseList.innerHTML = data.map(expense => `
        <p>${expense.amount} - ${expense.category}</p>
    `).join('');
}

// 页面加载时加载记账历史
loadExpenses();

document.querySelector("#groupInviteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const inviteEmail = document.querySelector("#inviteEmail").value;
    
    // 查找该邮箱对应的用户 ID
    const { data: user, error } = await supabase
        .from('users')
        .select('id')
        .eq('email', inviteEmail)
        .single();

    if (error || !user) {
        alert("用户未找到：" + error?.message);
        return;
    }

    // 邀请该用户加入群组（假设已有群组）
    const groupId = '某个群组的ID';  // 实际上应该由用户选择或在群组创建时生成
    const { error: insertError } = await supabase
        .from('group_members')
        .insert([
            { group_id: groupId, user_id: user.id }
        ]);

    if (insertError) {
        alert("邀请失败：" + insertError.message);
    } else {
        alert("邀请成功！");
    }
});
