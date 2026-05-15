const backLink = document.getElementById('backLink');
const listEn = document.getElementById('listEn');
const listDe = document.getElementById('listDe');
const countEn = document.getElementById('countEn');
const countDe = document.getElementById('countDe');

const back = sessionStorage.getItem('dictCompareBack');
if (back) backLink.href = back;

const enWords = loadDictWords('en');
const deWords = loadDictWords('de');

countEn.textContent = String(enWords.length);
countDe.textContent = String(deWords.length);

renderWordList(listEn, enWords, {
    variant: 'page',
    emptyText: 'Пока нет слов. Добавь их в английском чате.',
});

renderWordList(listDe, deWords, {
    variant: 'page',
    emptyText: 'Пока нет слов. Добавь их в немецком чате.',
});
