import axiosInstance from "../utils/axiosInstance";

const MojiService = {
  sendMessage: (message) => axiosInstance.post("/moji/chat", { message }),
  getHistory: () => axiosInstance.get("/moji/history"),
  clearHistory: () => axiosInstance.delete("/moji/history"),
  flagMessage: (messageIndex, flag) => axiosInstance.patch(`/moji/flag/${messageIndex}`, { flag }),
};

export default MojiService;
