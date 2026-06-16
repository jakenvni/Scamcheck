function showResultOnUI(result, originalText) {
    const textDisplay = document.getElementById('display-input-text');
    const badgeDisplay = document.getElementById('risk-level-badge');
    if (textDisplay) textDisplay.innerText = originalText;
    if (badgeDisplay) badgeDisplay.innerText = result.risk_level;
}

document.addEventListener("DOMContentLoaded", () => {
    renderHistoryList();
});