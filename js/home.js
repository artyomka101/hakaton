const langOptions = document.querySelectorAll('#langOptions .start-menu__btn');
const levelOptions = document.querySelectorAll('#levelOptions .start-menu__btn');
const startBtn = document.getElementById('startBtn');

let selectedLang = 'en';
let selectedLevel = 'easy';

langOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
        langOptions.forEach((b) => b.classList.remove('start-menu__btn--active'));
        btn.classList.add('start-menu__btn--active');
        selectedLang = btn.dataset.lang;
    });
});

levelOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
        levelOptions.forEach((b) => b.classList.remove('start-menu__btn--active'));
        btn.classList.add('start-menu__btn--active');
        selectedLevel = btn.dataset.level;
    });
});

startBtn.addEventListener('click', () => {
    if (selectedLang === 'en') {
        window.location.href = 'index.html?level=' + selectedLevel;
    } else {
        window.location.href = 'index2.html?level=' + selectedLevel;
    }
});
