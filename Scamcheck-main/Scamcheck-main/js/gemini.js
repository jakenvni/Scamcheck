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

async function analyzeMessage(message) {
    return {
        risk: "Nguy hiểm",
        signs: [
            { quote: message.substring(0, 30), reason: "Phát hiện dấu hiệu thúc ép chuyển tiền gấp." }
        ],
        actions: [
            "Tuyệt đối không chuyển khoản.",
            "Liên hệ trực tiếp với người thân qua kênh khác để xác minh."
        ]
    };
}