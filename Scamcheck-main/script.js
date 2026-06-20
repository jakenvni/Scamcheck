import { analyzeMessage } from "./js/gemini.js";

const button = document.getElementById("checkBtn");
const result = document.getElementById("result");

const psychologyDatabase = {
    "Nguy hiểm": [
        "Đừng hoảng sợ em nhé! Kẻ lừa đảo thường cố tình tạo ra tình huống khẩn cấp để làm chúng ta lo lắng và hành động sai lầm. Hãy hít một hơi thật sâu, tắt tin nhắn này đi và tuyệt đối không làm theo yêu cầu của họ.",
        "Cô biết lúc này em có thể đang rất lo lắng, nhưng hãy bình tĩnh lại nhé. Mọi tin nhắn dọa nạt khóa tài khoản hoặc phạt tiền đều là giả mạo. Hãy hỏi ý kiến của người lớn hoặc thầy cô ngay để được hỗ trợ.",
        "Giữ bình tĩnh là vũ khí mạnh nhất của em lúc này! Kẻ xấu đang muốn em đánh mất lý trí vì sợ hãi. Đừng bấm vào đâu cả, em đang an toàn và không có chuyện gì tồi tệ xảy ra đâu."
    ],
    "Nghi ngờ": [
        "Cảnh giác là rất tốt, em đã làm rất đúng khi đưa tin nhắn này đi kiểm tra! Khi gặp thông tin chưa rõ ràng, hãy tạm dừng lại, không vội vã tin ngay và chia sẻ với bạn bè hoặc người thân để cùng xác minh nhé.",
        "Em cảm thấy có chút bất an đúng không? Điều đó hoàn toàn bình thường khi gặp tin nhắn lạ. Cứ thong thả, đừng vội thực hiện bất kỳ thao tác nào. Sự cẩn thận của em hôm nay sẽ bảo vệ chính em đấy."
    ],
    "An toàn": [
        "Tin nhắn này có vẻ an toàn, em có thể yên tâm rồi nhé! Tuy nhiên, trong môi trường mạng, việc luôn giữ một tinh thần tỉnh táo và chủ động kiểm tra như thế này là một thói quen cực kỳ tuyệt vời.",
        "Tuyệt vời lắm, kết quả cho thấy không có dấu hiệu đáng ngại. Tiếp tục phát huy tinh thần cẩn trọng này em nhé, em đang tự bảo vệ mình rất tốt trên không gian mạng đấy!"
    ]
};

function hienThiLoiKhuyenTamLy(riskLevel) {
    const box = document.getElementById("psychologyBox");
    const adviceText = document.getElementById("psychologyAdvice");
    
    if (!box || !adviceText) return;

    let key = "An toàn";
    if (riskLevel.includes("Nguy hiểm")) key = "Nguy hiểm";
    else if (riskLevel.includes("Nghi ngờ")) key = "Nghi ngờ";

    const list = psychologyDatabase[key];
    const randomIndex = Math.floor(Math.random() * list.length);
    
    adviceText.innerText = list[randomIndex];
    box.style.display = "block";
}

function saveToHistory(scamText, analyticalResult) {
    let history = JSON.parse(localStorage.getItem('scam_history')) || [];
    
    const newEntry = {
        id: Date.now(),
        text: scamText,
        result: analyticalResult
    };
    
    history.unshift(newEntry);
    if (history.length > 5) {
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
        historyContainer.innerHTML = '<p style="font-size: 14px; color: #888; font-style: italic; padding: 5px 10px;">Chưa có lịch sử kiểm tra gần đây.</p>';
        return;
    }

    history.forEach(item => {
        const itemButton = document.createElement('button');
        itemButton.type = 'button';
        itemButton.className = 'history-item-btn';
        
        itemButton.style.width = '100%';
        itemButton.style.padding = '12px 15px';
        itemButton.style.textAlign = 'left';
        itemButton.style.background = '#ffffff';
        itemButton.style.border = '1px solid #e0e0e0';
        itemButton.style.borderRadius = '8px';
        itemButton.style.cursor = 'pointer';
        itemButton.style.fontSize = '14px';
        itemButton.style.color = '#444';
        itemButton.style.whiteSpace = 'nowrap';
        itemButton.style.overflow = 'hidden';
        itemButton.style.textOverflow = 'ellipsis';
        itemButton.style.marginTop = '8px';

        const shortText = item.text.length > 60 ? item.text.substring(0, 60) + '...' : item.text;
        itemButton.innerText = `🕒 ${shortText}`;
        
        itemButton.onclick = function() {
            const inputField = document.getElementById('messageInput');
            if (inputField) inputField.value = item.text;
            
            showAnalysisResult(item.result);
            hienThiLoiKhuyenTamLy(item.result.risk);
        };
        historyContainer.appendChild(itemButton);
    });
}

function showAnalysisResult(analysis) {
    let riskClass = "risk-danger";
    let riskIcon = "🟥";

    if (analysis.risk === "Nghi ngờ") {
        riskClass = "risk-warning";
        riskIcon = "🟨";
    } else if (analysis.risk === "An toàn") {
        riskClass = "risk-safe";
        riskIcon = "🟩";
    }

    const signsHtml = analysis.signs
        .map(sign => `<li><b>${sign.quote}</b><br>${sign.reason}</li>`)
        .join("");

    const actionsHtml = analysis.actions
        .map(action => `<li>${action}</li>`)
        .join("");

    result.innerHTML