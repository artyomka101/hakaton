const langOptions = document.querySelectorAll('#langOptions .start-menu__btn');
const levelOptions = document.querySelectorAll('#levelOptions .start-menu__btn');
const startBtn = document.getElementById('startBtn');

let selectedLang = 'en';
let selectedLevel = 'easy';

bindToggleGroup(langOptions, 'start-menu__btn--active', (btn) => {
    selectedLang = btn.dataset.lang;
});

bindToggleGroup(levelOptions, 'start-menu__btn--active', (btn) => {
    selectedLevel = btn.dataset.level;
});

startBtn.addEventListener('click', () => {
    const page = selectedLang === 'en' ? 'index.html' : 'index2.html';
    window.location.href = page + '?level=' + selectedLevel;
});
