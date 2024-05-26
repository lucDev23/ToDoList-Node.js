'use strict';

const btnMenu = document.getElementById('btn-menu');
const asideMenu = document.querySelector('.aside-menu');

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}
