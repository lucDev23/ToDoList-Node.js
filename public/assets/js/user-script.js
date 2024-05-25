'use strict';

// CHANGE BETWEEN LIST OPTIONS

// const btnsMenuOptions = document.querySelectorAll('.btn-menu-option');

// btnsMenuOptions.forEach((e, key) => {
//     e.addEventListener('click', function () {
//         btnsMenuOptions.forEach((e) =>
//             e.classList.remove('selected-menu-option')
//         );

//         // updatePageSection(e.id);

//         e.classList.add('selected-menu-option');

//         switch (e.id) {
//             case 'btn-my_day':
//                 console.log('My day');
//                 break;
//             case 'btn-important':
//                 console.log('Important');
//                 break;
//             case 'btn-planned':
//                 console.log('Planned');
//                 break;
//             case 'btn-task_lists':
//                 console.log('Task lists');
//         }
//     });
// });

// // consoleLog();

// const btnAddTask = document.getElementById('btn-add');

// btnAddTask.addEventListener('click', createTask);

// document.addEventListener('keydown', function (e) {
//     console.log('hola');
//     if (e.key === 'Enter') createTask();
// });

// function createTask() {
//     const inputTaskName = document.getElementById('input-task_name');
//     const inputTaskDate = document.getElementById('input-task_date');

//     const taskName = inputTaskName.value;
//     if (!taskName) return;

//     console.log(taskName);

//     addTaskMyDay(taskName);
//     inputTaskName.value = '';
//     inputTaskName.focus();
//     // addTaskPlanned(taskName, taskDate);
// }

// const tasksList = document.getElementById('tasks-list');

// function addTaskMyDay(taskName) {
//     const task = document.createElement('li');
//     task.classList.add('task-item');
//     task.innerHTML = `
// 		<button class="task-status" type="button" title="Mark as done">
//             <i class="fa-solid fa-check"></i>
//         </button>
//         <p class="task-name">${taskName}</p>
//         <button class="add-to-imp">
//             <i class="fa-regular fa-star menu-icon" title="Add to important"></i>
//         </button>`;
//     tasksList.appendChild(task);
// }

const btnMenu = document.getElementById('btn-menu');
const asideMenu = document.querySelector('.aside-menu');

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}
