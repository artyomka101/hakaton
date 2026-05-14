const API_URL = 'http://localhost:5016';

const sendSettings = async (language, topic, complexity) => {
    const res = await fetch(`${API_URL}/api/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, topic, complexity }),
    });
    if (!res.ok) throw new Error('settings error');
};

const startChat = async () => {
    const res = await fetch(`${API_URL}/api/chat/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('start error');
    const text = await res.text();
    try {
        const data = JSON.parse(text);
        return typeof data === 'string' ? data : (data.answer || data.message || JSON.stringify(data));
    } catch {
        return text;
    }
};

const sendMessage = async (message) => {
    const res = await fetch(`${API_URL}/api/chat/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error('chat error');
    const text = await res.text();
    try {
        const data = JSON.parse(text);
        return typeof data === 'string' ? data : (data.answer || data.message || JSON.stringify(data));
    } catch {
        return text;
    }
};
