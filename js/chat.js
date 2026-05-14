const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');
const levelBtns = document.querySelectorAll('.menu__level');
const langBtns = document.querySelectorAll('.menu__lang');

const params = new URLSearchParams(window.location.search);
let level = params.get('level') || 'easy';
let lang = params.get('lang') || 'en';

levelBtns.forEach((btn) => {
    if (btn.dataset.level === level) {
        levelBtns.forEach((b) => b.classList.remove('menu__level--active'));
        btn.classList.add('menu__level--active');
    }
});

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
        level = btn.dataset.level;
    });
});

langBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.dataset.lang === 'en') {
            window.location.href = 'index.html?level=' + level;
        } else {
            window.location.href = 'index2.html?level=' + level + '&lang=' + btn.dataset.lang;
        }
    });
});

const addMessage = (text, side) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat__bubble chat__bubble--' + side;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatSend.addEventListener('click', () => {
    sendMessage();
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
});

const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'human');
    chatInput.value = '';
};

function toggleDropdown() {
    document.getElementById('dropdownList').classList.toggle('header__dropdown--open');
}

function selectTopic(el, text) {
    document.getElementById('selectText').textContent = text;
    document.getElementById('selectText').style.color = '#333';
    document.getElementById('dropdownList').classList.remove('header__dropdown--open');
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.menu') && !e.target.closest('#menuBtn')) {
        menuPanel.classList.remove('menu--open');
    }
    if (!e.target.closest('.header__select-wrap')) {
        document.getElementById('dropdownList').classList.remove('header__dropdown--open');
    }
});
