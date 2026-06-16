async function analyzeMessage(message) {
    // Đoạn code mẫu để chạy thử giao diện, sau này bạn cấu hình API Gemini vào đây
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