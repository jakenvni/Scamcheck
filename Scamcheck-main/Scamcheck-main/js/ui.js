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

document.addEventListener("DOMContentLoaded", () => {
    if (typeof renderHistoryList === "function") {
        renderHistoryList();
    }

    const button = document.getElementById("checkBtn");
    const resultContainer = document.getElementById("result");

    if (button) {
        button.addEventListener("click", async () => {
            const message = document.getElementById("messageInput").value;
            if (!message.trim()) {
                if (resultContainer) resultContainer.innerHTML = "⚠️ Vui lòng nhập nội dung tin nhắn.";
                return;
            }

            if (resultContainer) resultContainer.innerHTML = "⏳ Đang phân tích...";

            try {
                const analysis = await analyzeMessage(message);
                if (typeof saveToHistory === "function") {
                    saveToHistory(message, analysis);
                }
                showResultOnUI(analysis);
            } catch (error) {
                if (resultContainer) resultContainer.innerHTML = `❌ ${error.message}`;
            }
        });
    }
});