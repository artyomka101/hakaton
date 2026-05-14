const dictBtn = document.getElementById('dictBtn');
const dictModal = document.getElementById('dictModal');
const dictClose = document.getElementById('dictClose');
const wordInput = document.getElementById('wordInput');
const transcInput = document.getElementById('transcInput');
const addWordBtn = document.getElementById('addWordBtn');
const wordList = document.getElementById('wordList');

let words = JSON.parse(localStorage.getItem('dictWords')) || [];

dictBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dictModal.classList.toggle('dict--open');
    renderWords();
});

dictClose.addEventListener('click', () => {
    dictModal.classList.remove('dict--open');
});

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
        deleteBtn.dataset.index = index;
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
    localStorage.setItem('dictWords', JSON.stringify(words));
};

const escapeHtml = (str) => {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
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
    if (!e.target.closest('.dict') && !e.target.closest('#dictBtn')) {
        dictModal.classList.remove('dict--open');
    }
    if (!e.target.closest('.header__select-wrap')) {
        document.getElementById('dropdownList').classList.remove('header__dropdown--open');
    }
});
