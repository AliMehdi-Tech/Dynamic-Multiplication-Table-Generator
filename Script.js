const form = document.getElementById('tableForm');
const numberInput = document.getElementById('number');
const startInput = document.getElementById('start');
const endInput = document.getElementById('end');
const tableBody = document.getElementById('tableBody');
const resultsCard = document.getElementById('resultsCard');
const emptyState = document.getElementById('emptyState');
const tableTitle = document.getElementById('tableTitle');
const tableRange = document.getElementById('tableRange');
const errorMsg = document.getElementById('errorMsg');
const clearBtn = document.getElementById('clearBtn');

function allowOnlyNumbers(e) {
    if ([8, 9, 13, 27, 46, 37, 38, 39, 40].includes(e.keyCode)) {
        return;
    }

    if ((e.ctrlKey || e.metaKey) && [65, 67, 86, 88].includes(e.keyCode)) {
        return;
    }

    if (!/^[0-9\-]$/.test(e.key)) {
        e.preventDefault();
    }
}

function preventInvalidPaste(e) {
    const pasteData = (e.clipboardData || window.clipboardData).getData('text');

    if (!/^-?\d*$/.test(pasteData)) {
        e.preventDefault();
    }
}

[numberInput, startInput, endInput].forEach(input => {
    input.addEventListener('keydown', allowOnlyNumbers);
    input.addEventListener('paste', preventInvalidPaste);
});

form.addEventListener('submit', e => {
    e.preventDefault();
    generateTable();
});

clearBtn.addEventListener('click', () => {
    form.reset();
    resultsCard.style.display = 'none';
    emptyState.style.display = 'block';
    errorMsg.style.display = 'none';
    numberInput.focus();
});

function generateTable() {
    const numValue = numberInput.value.trim();
    const startValue = startInput.value.trim();
    const endValue = endInput.value.trim();

    if (!numValue || !startValue || !endValue) {
        showError('Please fill all fields.');
        return;
    }

    const num = Number(numValue);
    const start = Number(startValue);
    const end = Number(endValue);

    if (isNaN(num) || isNaN(start) || isNaN(end)) {
        showError('Only numbers are allowed.');
        return;
    }

    if (num === 0) {
        showError('Table number cannot be zero.');
        return;
    }

    errorMsg.style.display = 'none';

    const step = start <= end ? 1 : -1;

    tableTitle.textContent = `Multiplication Table of ${num}`;
    tableRange.textContent = `From ${start} to ${end}`;
    tableBody.innerHTML = '';

    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        const row = document.createElement('tr');

        row.classList.add('animate');

        row.innerHTML = `
                    <td>${num} × ${i}</td>
                    <td><strong>${num * i}</strong></td>
                `;

        tableBody.appendChild(row);
    }

    emptyState.style.display = 'none';
    resultsCard.style.display = 'block';
    resultsCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
    resultsCard.style.display = 'none';
    emptyState.style.display = 'block';
}