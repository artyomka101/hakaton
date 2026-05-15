const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');
const levelBtns = document.querySelectorAll('.menu__level');
const langBtns = document.querySelectorAll('.menu__lang');
const sendBtn = document.querySelector('.chat__send-btn');
const inputField = document.querySelector('.chat__input');
const chatMessages = document.getElementById('chatMessages');

const PAGE_LANG = document.documentElement.dataset.lang || 'en';
const IS_DE_LAYOUT = Boolean(document.querySelector('.main2'));
const complexityMap = { easy: 'Лёгкий', medium: 'Средний', hard: 'Сложный' };
const greetings = { en: 'Привет! Давай поговорим.', de: 'Hallo! Lass uns reden.' };

const urlParams = new URLSearchParams(window.location.search);
let selectedLevel = urlParams.get('level') || 'easy';
let chatStarted = false;
let loadingMsg = null;

setActiveByData(levelBtns, 'menu__level--active', 'level', selectedLevel);

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuPanel.classList.toggle('menu--open');
});

menuClose.addEventListener('click', () => {
    menuPanel.classList.remove('menu--open');
});

bindToggleGroup(levelBtns, 'menu__level--active', (btn) => {
    selectedLevel = btn.dataset.level;
});

langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const dest = btn.dataset.lang === 'en' ? 'index.html' : 'index2.html';
        window.location.href = dest + '?level=' + selectedLevel;
    });
});

const scrollChat = () => {
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

const createAiAvatar = () => {
    const img = document.createElement('img');
    img.className = 'chat__msg-avatar chat__msg-avatar--wolf';
    img.alt = '';
    if (IS_DE_LAYOUT) {
        img.src = 'img/Mask group.png';
    } else {
        img.src = 'img/Frame 2085663348.png';
        img.onerror = () => { img.onerror = null; img.src = 'img/Mask group.png'; };
    }
    return img;
};

const createUserAvatar = () => {
    const wrap = document.createElement('div');
    wrap.className = 'chat__msg-avatar chat__msg-avatar--user';
    wrap.setAttribute('aria-hidden', 'true');
    wrap.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" fill="white"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="white"/></svg>';
    return wrap;
};

const createBubble = (role, text) => {
    const bubble = document.createElement('div');
    bubble.className = role === 'ai' ? 'chat__bubble chat__bubble--wolf' : 'chat__bubble chat__bubble--human';
    bubble.textContent = text;
    return bubble;
};

const appendMessage = (role, text) => {
    const msg = document.createElement('div');
    const aiSide = IS_DE_LAYOUT ? 'right' : 'left';
    const userSide = IS_DE_LAYOUT ? 'left' : 'right';
    const side = role === 'ai' ? aiSide : userSide;
    msg.className = `chat__msg chat__msg--${side}`;

    const bubble = createBubble(role, text);
    const avatar = role === 'ai' ? createAiAvatar() : createUserAvatar();

    if (side === 'left') {
        msg.append(avatar, bubble);
    } else {
        msg.append(bubble, avatar);
    }

    chatMessages.appendChild(msg);
    scrollChat();
    return msg;
};

const clearHint = () => {
    chatMessages.querySelector('.chat__msg--hint')?.remove();
};

const setLoading = (loading) => {
    sendBtn.disabled = loading;
    inputField.disabled = loading;
    inputField.placeholder = loading ? '...' : 'Поиск';

    if (loading) {
        loadingMsg = appendMessage('ai', '...');
        loadingMsg.classList.add('chat__msg--loading');
    } else if (loadingMsg) {
        loadingMsg.remove();
        loadingMsg = null;
    }
};

const initChat = async (topic) => {
    setLoading(true);
    try {
        await sendSettings(PAGE_LANG, topic, complexityMap[selectedLevel]);
        const result = await startChat();
        clearHint();
        appendMessage('ai', result || greetings[PAGE_LANG]);
        chatStarted = true;
    } catch {
        if (!chatStarted) clearHint();
        appendMessage('ai', 'Не удалось подключиться к серверу.');
    }
    setLoading(false);
};

const handleSend = async () => {
    const text = inputField.value.trim();
    if (!text || !chatStarted) return;
    inputField.value = '';
    appendMessage('user', text);
    setLoading(true);
    try {
        appendMessage('ai', await sendMessage(text));
    } catch {
        appendMessage('ai', 'Ошибка соединения.');
    }
    setLoading(false);
};

sendBtn.addEventListener('click', handleSend);
inputField.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

function toggleDropdown() {
    document.getElementById('dropdownList').classList.toggle('header__dropdown--open');
}

function selectTopic(el, text) {
    document.getElementById('selectText').textContent = text;
    document.getElementById('selectText').style.color = '#333';
    document.getElementById('dropdownList').classList.remove('header__dropdown--open');
    initChat(text);
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu') && !e.target.closest('#menuBtn')) {
        menuPanel.classList.remove('menu--open');
    }
    if (!e.target.closest('.header__select-wrap')) {
        document.getElementById('dropdownList').classList.remove('header__dropdown--open');
    }
});
