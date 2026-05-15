const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');
const levelBtns = document.querySelectorAll('.menu__level');
const langBtns = document.querySelectorAll('.menu__lang');
const sendBtn = document.querySelector('.chat__send-btn');
const inputField = document.querySelector('.chat__input');
const wolfBubble = document.querySelector('.chat__bubble--wolf');
const humanBubble = document.querySelector('.chat__bubble--human');

const PAGE_LANG = document.documentElement.dataset.lang || 'en';
const complexityMap = { easy: 'Легко', medium: 'Средний', hard: 'Сложно' };
const greetings = { en: 'Привет! Давай поговорим.', de: 'Hallo! Lass uns reden.' };

let selectedLevel = 'easy';
let chatStarted = false;

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
        const dest = btn.dataset.lang === 'en' ? 'index.html' : 'index2.html';
        window.location.href = dest + '?level=' + selectedLevel;
    });
});

const setWolfText = (text) => { wolfBubble.textContent = text; };

const setLoading = (loading) => {
    sendBtn.disabled = loading;
    inputField.disabled = loading;
    if (loading) setWolfText('...');
};

const initChat = async (topic) => {
    setLoading(true);
    try {
        await sendSettings(PAGE_LANG, topic, complexityMap[selectedLevel]);
        const result = await startChat();
        setWolfText(result || greetings[PAGE_LANG]);
        chatStarted = true;
    } catch {
        setWolfText('Не удалось подключиться к серверу.');
    }
    setLoading(false);
};

const handleSend = async () => {
    const text = inputField.value.trim();
    if (!text || !chatStarted) return;
    inputField.value = '';
    humanBubble.textContent = text;
    setLoading(true);
    try {
        setWolfText(await sendMessage(text));
    } catch {
        setWolfText('Ошибка соединения.');
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
