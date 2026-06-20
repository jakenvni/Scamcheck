//Cô tâm lý phân tích tin nhắn để phát hiện nguy cơ lừa đảo    
export async function getPsychologyAdvice(risk) {

    if (risk === "Nguy hiểm") {
        return "Bác ơi, tin nhắn này đang cố tạo cảm giác lo lắng để bác phản ứng thật nhanh.";
    }

    if (risk === "Nghi ngờ") {
        return "Bác ơi, tin nhắn này có một số dấu hiệu khiến mình cần cẩn trọng hơn trước khi làm theo.";
    }

    return null;
}