const API_URL = 'http://localhost:5016';

const sendSettings = async (language, topic, complexity) => {
    await apiPost(`${API_URL}/api/settings`, { language, topic, complexity });
};

const startChat = async () => {
    const text = await apiPost(`${API_URL}/api/chat/start`, {});
    return parseApiResponse(text);
};

const sendMessage = async (message) => {
    const text = await apiPost(`${API_URL}/api/chat/chat`, { message });
    return parseApiResponse(text);
};
