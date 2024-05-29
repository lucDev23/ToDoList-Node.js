'use strict';

const btnMenu = document.getElementById('button__menu');
const asideMenu = document.querySelector('.nav');
const taskName = document.getElementById('task_name');

if (taskName) taskName.focus();

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}
