const API_KEY = "MY_API_KEY";
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

async function checkMessage() {
    const input = document.getElementById("messageInput").value;
    const display = document.getElementById("result");
    
    display.innerText = "Đang phân tích...";

    const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: "Phân tích tin nhắn này có lừa đảo không: " + input }] }]
        })
    });

    const data = await response.json();
  
    const resultText = data.candidates[0].content.parts[0].text;
    display.innerText = resultText;
}

document.getElementById("checkButton").addEventListener("click", checkMessage);
