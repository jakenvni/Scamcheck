// ==========================================
// 1. CHỨC NĂNG PHÂN TÍCH TIN NHẮN (GEMINI MOCK)
// ==========================================
async function analyzeMessage(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                risk: "Nguy hiểm",
                signs: [
                    { quote: message.substring(0, 30), reason: "Phát hiện dấu hiệu thúc ép chuyển khoản gấp hoặc đe dọa." }
                ],
                actions: [
                    "Tuyệt đối không chuyển khoản, không bấm vào link lạ hay gửi mã OTP.",
                    "Gọi điện thoại trực tiếp cho người thân qua số liên lạc thông thường để xác minh."
                ]
            });
        }, 800); // Giả lập chờ AI phản hồi 0.8 giây
    });
}

// ==========================================
// 2. CHỨC NĂNG LƯU TRỮ VÀ VẼ LỊCH SỬ (STORAGE)
// ==========================================
function saveToHistory(scamText, analyticalResult) {
    let history = JSON.parse(localStorage.getItem('scam_history')) || [];
    const newEntry = {
        id: Date.now(),
        text: scamText,
        result: analyticalResult
    };
    history.unshift(newEntry);
    if (history.length > 10) {
        history.pop();
    }
    localStorage.setItem('scam_history', JSON.stringify(history));
    renderHistoryList();
}

function renderHistoryList() {
    const historyContainer = document.getElementById('history-list');
    if (!historyContainer) return;
    
    let history = JSON.parse(localStorage.getItem('scam_history')) || [];
    historyContainer.innerHTML = '';
    
    if (history.length === 0) {
        historyContainer.innerHTML = '<p style="font-size: 18px; color: #666;">Chưa có lịch sử kiểm tra.</p>';
        return;
    }
    
    history.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.className = 'history-item-btn';
        const shortText = item.text.length > 40 ? item.text.substring(0, 40) + '...' : item.text;
        itemButton.innerText = `🕒 ${shortText}`;
        itemButton.onclick = function() {
            showResultOnUI(item.result);
        };
        historyContainer.appendChild(itemButton);
    });
}

// ==========================================
// 3. CHỨC NĂNG HIỂN THỊ GIAO DIỆN (UI)
// ==========================================
function showResultOnUI(analysis) {
    const resultContainer = document.getElementById("result");
    if (!resultContainer) return;

    let riskClass = "risk-danger";
    let riskIcon = "🟥";

    if (analysis.risk === "Nghi ngờ") {
        riskClass = "risk-warning";
        riskIcon = "🟨";
    }
    if (analysis.risk === "An toàn") {
        riskClass = "risk-safe";
        riskIcon = "🟩";
    }

    const signsHtml = analysis.signs
        .map(sign => `<li><b>${sign.quote}</b><br>${sign.reason}</li>`)
        .join("");

    const actionsHtml = analysis.actions
        .map(action => `<li>${action}</li>`)
        .join("");

    resultContainer.innerHTML = `
        <div class="risk-card ${riskClass}">
            <div class="risk-title">${riskIcon} ${analysis.risk}</div>
            <h3>Dấu hiệu phát hiện</h3>
            <ul>${signsHtml}</ul>
            <h3>Khuyến nghị</h3>
            <ul>${actionsHtml}</ul>
        </div>
    `;
}

// KHỞI CHẠY KHI TRANG WEB TẢI XONG
document.addEventListener("DOMContentLoaded", () => {
    // Vẽ lại lịch sử cũ ra màn hình nếu có
    renderHistoryList();

    const button = document.getElementById("checkBtn");
    const resultContainer = document.getElementById("result");

    if (button) {
        button.addEventListener("click", async () => {
            const messageInput = document.getElementById("messageInput");
            if (!messageInput) return;
            
            const message = messageInput.value.trim();
            if (!message) {
                if (resultContainer) resultContainer.innerHTML = "⚠️ Vui lòng nhập nội dung tin nhắn.";
                return;
            }

            if (resultContainer) resultContainer.innerHTML = "⏳ Đang phân tích...";

            try {
                const analysis = await analyzeMessage(message);
                saveToHistory(message, analysis);
                showResultOnUI(analysis);
            } catch (error) {
                if (resultContainer) resultContainer.innerHTML = `❌ Lỗi hệ thống: ${error.message}`;
            }
        });
    }
});