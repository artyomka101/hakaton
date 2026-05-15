const dictBtn = document.getElementById('dictBtn');
const dictModal = document.getElementById('dictModal');
const dictClose = document.getElementById('dictClose');
const wordInput = document.getElementById('wordInput');
const transcInput = document.getElementById('transcInput');
const addWordBtn = document.getElementById('addWordBtn');
const wordList = document.getElementById('wordList');
const dictCompareBtn = document.getElementById('dictCompareBtn');

const pageLang = document.documentElement.dataset.lang || 'en';
const storageKey = 'dictWords_' + pageLang;

let words = loadDictWords(pageLang);

dictBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dictModal.classList.toggle('dict--open');
    renderWords();
});

dictClose.addEventListener('click', () => {
    dictModal.classList.remove('dict--open');
});

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

const saveWords = () => {
    localStorage.setItem(storageKey, JSON.stringify(words));
};

const renderWords = () => {
    renderWordList(wordList, words, {
        variant: 'modal',
        onDeleteIndex: (index) => {
            words.splice(index, 1);
            saveWords();
            renderWords();
        },
    });
};

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dict') && !e.target.closest('#dictBtn')) {
        dictModal.classList.remove('dict--open');
    }
});
