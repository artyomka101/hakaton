const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');
const levelBtns = document.querySelectorAll('.menu__level');
const langBtns = document.querySelectorAll('.menu__lang');
const sendBtn = document.querySelector('.chat__send-btn');
const inputField = document.querySelector('.chat__input');
const wolfBubble = document.querySelector('.chat__bubble--wolf');

let selectedLevel = 'easy';
let chatStarted = false;

const complexityMap = { easy: 'Легко', medium: 'Средний', hard: 'Сложно' };

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuPanel.classList.toggle('menu--open');
});

menuClose.addEventListener('click', () => {
    menuPanel.classList.remove('menu--open');
});

levelBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        levelBtns.forEach((b) => b.classList.remove('menu__level--active'));
        btn.classList.add('menu__level--active');
        selectedLevel = btn.dataset.level;
    });
});

langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.dataset.lang === 'en') {
            window.location.href = 'index.html?level=' + selectedLevel;
        } else {
            window.location.href = 'index2.html?level=' + selectedLevel;
        }
    });
});

const setWolfText = (text) => {
    wolfBubble.textContent = text;
};

const setLoading = (loading) => {
    sendBtn.disabled = loading;
    inputField.disabled = loading;
    if (loading) {
        setWolfText('...');
    }
};

const initChat = async (topic) => {
    setLoading(true);
    try {
        await sendSettings('en', topic, complexityMap[selectedLevel]);
        const result = await startChat();
        setWolfText(result.answer || result.message || 'Привет! Давай поговорим.');
        chatStarted = true;
    } catch (err) {
        setWolfText('Не удалось подключиться к серверу.');
    }
    setLoading(false);
};

const humanBubble = document.querySelector('.chat__bubble--human');

const handleSend = async () => {
    const text = inputField.value.trim();
    if (!text || !chatStarted) return;
    inputField.value = '';
    humanBubble.textContent = text;
    setLoading(true);
    try {
        const answer = await sendMessage(text);
        setWolfText(answer);
    } catch (err) {
        setWolfText('Ошибка соединения.');
    }
    setLoading(false);
};

sendBtn.addEventListener('click', handleSend);

inputField.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
});

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
