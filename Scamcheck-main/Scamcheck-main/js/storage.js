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
            if (typeof showResultOnUI === "function") {
                showResultOnUI(item.result);
            }
        };
        historyContainer.appendChild(itemButton);
    });
}