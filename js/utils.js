/** Кнопки-переключатели: одна активная */
function bindToggleGroup(buttons, activeClass, onSelect) {
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (e.stopPropagation) e.stopPropagation();
            buttons.forEach((b) => b.classList.remove(activeClass));
            btn.classList.add(activeClass);
            if (onSelect) onSelect(btn);
        });
    });
}

/** Подсветить кнопку по data-атрибуту */
function setActiveByData(buttons, activeClass, attr, value) {
    buttons.forEach((btn) => {
        btn.classList.toggle(activeClass, btn.dataset[attr] === value);
    });
}

/** POST JSON → текст ответа */
async function apiPost(url, body) {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body ?? {}),
    });
    if (!res.ok) throw new Error('api error');
    return res.text();
}

/** Разбор ответа чата (строка или { answer }) */
function parseApiResponse(text) {
    try {
        const data = JSON.parse(text);
        return typeof data === 'string' ? data : (data.answer || data.message || JSON.stringify(data));
    } catch {
        return text;
    }
}

function loadDictWords(lang) {
    try {
        return JSON.parse(localStorage.getItem('dictWords_' + lang)) || [];
    } catch {
        return [];
    }
}

/** Карточка слова: variant 'modal' | 'page' */
function createWordCard(item, options = {}) {
    const { variant = 'modal', onDelete } = options;
    const card = document.createElement('div');
    card.className = variant === 'page' ? 'dict-page__card' : 'word-card';

    if (variant === 'page') {
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
        return card;
    }

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

    card.appendChild(info);

    if (onDelete) {
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'word-card__delete';
        deleteBtn.textContent = '✕';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDelete();
        });
        card.appendChild(deleteBtn);
    }

    return card;
}

function renderWordList(container, words, options = {}) {
    const { variant = 'modal', emptyText, onDeleteIndex } = options;
    container.innerHTML = '';

    if (!words.length && emptyText) {
        const empty = document.createElement('p');
        empty.className = variant === 'page' ? 'dict-page__empty' : 'dict__empty';
        empty.textContent = emptyText;
        container.appendChild(empty);
        return;
    }

    words.forEach((item, index) => {
        const onDelete = onDeleteIndex ? () => onDeleteIndex(index) : undefined;
        container.appendChild(createWordCard(item, { variant, onDelete }));
    });
}
