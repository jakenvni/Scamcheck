function showResultOnUI(result, originalText) {
    const textDisplay = document.getElementById('display-input-text');
    const badgeDisplay = document.getElementById('risk-level-badge');
    if (textDisplay) textDisplay.innerText = originalText;
    if (badgeDisplay) badgeDisplay.innerText = result.risk_level;
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof renderHistoryList === "function") {
        renderHistoryList();
    }

    const checkBtn = document.getElementById('checkBtn');
    const messageInput = document.getElementById('messageInput');

    if (checkBtn && messageInput) {
        checkBtn.addEventListener('click', async () => {
            const text = messageInput.value.trim();
            if (!text) return;

            const mockResult = {
                risk_level: "Cao",
                scam_signs: [],
                recommended_actions: []
            };

            if (typeof saveToHistory === "function") {
                saveToHistory(text, mockResult);
            }
            showResultOnUI(mockResult, text);
        });
    }
});