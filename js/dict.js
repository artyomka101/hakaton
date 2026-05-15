const dictBtn = document.getElementById('dictBtn');
const dictModal = document.getElementById('dictModal');
const dictClose = document.getElementById('dictClose');
const wordInput = document.getElementById('wordInput');
const transcInput = document.getElementById('transcInput');
const addWordBtn = document.getElementById('addWordBtn');
const wordList = document.getElementById('wordList');

const pageLang = document.documentElement.dataset.lang || 'en';
const storageKey = 'dictWords_' + pageLang;

let words = JSON.parse(localStorage.getItem(storageKey)) || [];

dictBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dictModal.classList.toggle('dict--open');
    renderWords();
});

dictClose.addEventListener('click', () => {
    dictModal.classList.remove('dict--open');
});

const dictCompareBtn = document.getElementById('dictCompareBtn');
if (dictCompareBtn) {
    dictCompareBtn.addEventListener('click', () => {
        sessionStorage.setItem('dictCompareBack', window.location.pathname.split('/').pop() || 'index.html');
        window.location.href = 'dict-compare.html';
    });
}

addWordBtn.addEventListener('click', () => {
    const word = wordInput.value.trim();
    const transc = transcInput.value.trim();
    if (!word) return;
    words.push({ word, transc });
    saveWords();
    renderWords();
    wordInput.value = '';
    transcInput.value = '';
});

const renderWords = () => {
    wordList.innerHTML = '';
    words.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'word-card';

        const info = document.createElement('div');
        info.className = 'word-card__info';

        const wordEl = document.createElement('span');
        wordEl.className = 'word-card__word';
        wordEl.textContent = item.word;
        info.appendChild(wordEl);

        if (item.transc) {
            const transcEl = document.createElement('span');
            transcEl.className = 'word-card__transc';
            transcEl.textContent = item.transc;
            info.appendChild(transcEl);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'word-card__delete';
        deleteBtn.textContent = '✕';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            words.splice(index, 1);
            saveWords();
            renderWords();
        });

        card.appendChild(info);
        card.appendChild(deleteBtn);
        wordList.appendChild(card);
    });
};

const saveWords = () => {
    localStorage.setItem(storageKey, JSON.stringify(words));
};

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dict') && !e.target.closest('#dictBtn')) {
        dictModal.classList.remove('dict--open');
    }
});
