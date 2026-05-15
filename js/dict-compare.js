const backLink = document.getElementById('backLink');
const listEn = document.getElementById('listEn');
const listDe = document.getElementById('listDe');
const countEn = document.getElementById('countEn');
const countDe = document.getElementById('countDe');

const back = sessionStorage.getItem('dictCompareBack');
if (back) backLink.href = back;

const loadWords = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};

const renderColumn = (container, words, emptyText) => {
    container.innerHTML = '';
    if (!words.length) {
        const empty = document.createElement('p');
        empty.className = 'dict-page__empty';
        empty.textContent = emptyText;
        container.appendChild(empty);
        return;
    }
    words.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'dict-page__card';

        const word = document.createElement('span');
        word.className = 'dict-page__word';
        word.textContent = item.word;
        card.appendChild(word);

        if (item.transc) {
            const transc = document.createElement('span');
            transc.className = 'dict-page__transc';
            transc.textContent = item.transc;
            card.appendChild(transc);
        }

        container.appendChild(card);
    });
};

const enWords = loadWords('dictWords_en');
const deWords = loadWords('dictWords_de');

countEn.textContent = String(enWords.length);
countDe.textContent = String(deWords.length);

renderColumn(listEn, enWords, 'Пока нет слов. Добавь их в английском чате.');
renderColumn(listDe, deWords, 'Пока нет слов. Добавь их в немецком чате.');
