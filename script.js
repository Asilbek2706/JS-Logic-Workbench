"use strict";

const parts = document.querySelectorAll('.part');
const dropZone = document.getElementById('main-slot');

parts.forEach(part => {
    part.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.innerText);
        e.target.style.opacity = '0.5';
    });

    part.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
    });
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('highlight');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('highlight');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    dropZone.classList.remove('highlight');

    dropZone.innerHTML = `<div class="installed-part">${data} INSTALLED</div>`;
    console.log(`%c [EVENT]: ${data} is installed successfully!`, 'color: #00ff88');
});

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'r') {
        dropZone.innerHTML = '<p class="status-text">Drop the part here...</p>';
        dropZone.style.borderColor = '#333';
        console.log("%c [SYSTEM]: It has been reset", "color: orange");
    }

    if (key === 'c') {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
        dropZone.style.borderColor = randomColor;
    }
});

dropZone.addEventListener('mousemove', (e) => {
    const rect = dropZone.getBoundingClientRect();
    const x = Math.floor(e.clientX - rect.left);
    const y = Math.floor(e.clientY - rect.top);

    dropZone.style.setProperty('--mouse-x', `${x}px`);
    dropZone.style.setProperty('--mouse-y', `${y}px`);
});