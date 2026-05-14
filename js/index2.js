const menuBtn = document.getElementById('menuBtn');
const menuPanel = document.getElementById('menuPanel');
const menuClose = document.getElementById('menuClose');
const levelBtns = document.querySelectorAll('.menu__level');
const langBtns = document.querySelectorAll('.menu__lang');

let selectedLevel = 'easy';

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
