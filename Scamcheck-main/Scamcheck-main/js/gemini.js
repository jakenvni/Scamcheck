function parseDetectiveResponse(aiResponse) {
    const defaultData = {
        risk: "Chưa xác định",
        signs: [],
        actions: []
    };
    try {
        let cleanText = aiResponse.trim();
        if (cleanText.includes("```json")) {
            cleanText = cleanText.split("```json")[1].split("```")[0].trim();
        } else if (cleanText.includes("```")) {
            cleanText = cleanText.split("```")[1].split("```")[0].trim();
        }
        const parsedJSON = JSON.parse(cleanText);
        if (parsedJSON && typeof parsedJSON === 'object') {
            return {
                risk: parsedJSON.risk || defaultData.risk,
                signs: parsedJSON.signs || defaultData.signs,
                actions: parsedJSON.actions || defaultData.actions
            };
        }
        return defaultData;
    } catch (error) {
        return defaultData;
    }
}

// Hàm phân tích tin nhắn bắt buộc phải có async để ui.js gọi await không bị lỗi
async function analyzeMessage(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                risk: "Nguy hiểm",
                signs: [
                    { quote: message.substring(0, 30), reason: "Phát hiện dấu hiệu tống tiền hoặc thúc ép chuyển khoản gấp." }
                ],
                actions: [
                    "Tuyệt đối không chuyển khoản hay cung cấp OTP.",
                    "Gọi điện trực tiếp cho người thân bằng số điện thoại quen thuộc để xác minh."
                ]
            });
        }, 1000); // Giả lập chờ AI phản hồi trong 1 giây
    });
}