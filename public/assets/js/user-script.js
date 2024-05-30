'use strict';

const btnMenu = document.getElementById('button__menu');
const asideMenu = document.querySelector('.nav');
const taskName = document.getElementById('task_name');

if (taskName) taskName.focus();

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}

const deleteTask = async (button) => {
    const taskId = button.parentNode.querySelector('[name=taskId]').value;

    const taskElement = button.closest('.tasks__item ');

    try {
        await fetch('/user/delete/' + taskId, { method: 'DELETE' });
        taskElement.remove();
    } catch (error) {
        console.log(error);
    }
};
