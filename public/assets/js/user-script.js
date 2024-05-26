'use strict';

const btnMenu = document.getElementById('btn-menu');
const asideMenu = document.querySelector('.aside-menu');
const taskName = document.getElementById('input-task_name');

taskName.focus();

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}
