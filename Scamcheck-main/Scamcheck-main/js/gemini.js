async function analyzeMessage(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                risk: "Nguy hiểm",
                signs: [
                    { quote: message.substring(0, 30), reason: "Phát hiện dấu hiệu thúc ép chuyển khoản gấp." }
                ],
                actions: [
                    "Tuyệt đối không chuyển tiền.",
                    "Liên hệ trực tiếp với người thân để kiểm tra lại."
                ]
            });
        }, 800);
    });
}