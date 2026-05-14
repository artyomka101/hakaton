const langOptions = document.querySelectorAll('#langOptions .home__option');
const levelOptions = document.querySelectorAll('#levelOptions .home__option');
const startBtn = document.getElementById('startBtn');

let selectedLang = 'en';
let selectedLevel = 'easy';

langOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
        langOptions.forEach((b) => b.classList.remove('home__option--active'));
        btn.classList.add('home__option--active');
        selectedLang = btn.dataset.lang;
    });
});

levelOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
        levelOptions.forEach((b) => b.classList.remove('home__option--active'));
        btn.classList.add('home__option--active');
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
