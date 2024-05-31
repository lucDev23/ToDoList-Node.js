'use strict';

const btnMenu = document.getElementById('button__menu');
const asideMenu = document.querySelector('.nav');
const taskName = document.getElementById('task_name');

function editElement(name, priority, category, status, date) {
    return `
		<div class="edit">
			<div class="edit__content">
				<button class="edit__close"><i class="fa-solid fa-xmark"></i></button>
				<form class="edit__form" action="">
					<div class="form__elements">
						<div class="edit__input-group">
							<label class="create-task__label" for="task_name">Name: </label>
							<input
								class="input__name"
								id="task_name"
								name="task_name"
								type="text"
								autocomplete="off"
								value="${name}"
							/>
						</div>
						<div class="edit__input-group">
							<label for="task-priority">Priority: </label>
							<select id="task-priority" name="task_priority" >
								<option value="low" ${priority === 'low' ? 'selected' : ''}>low</option>
								<option value="medium" ${
                                    priority === 'medium' ? 'selected' : ''
                                }>medium</option>
								<option value="high" ${priority === 'high' ? 'selected' : ''}>high</option>
							</select>
						</div>
						<div class="edit__input-group">
							<label for="task-category">Category: </label>
							<select id="task-category" name="task_category" >
								<option value="general" ${
                                    category === 'general' ? 'selected' : ''
                                }>general</option>
								<option value="work" ${category === 'work' ? 'selected' : ''}>work</option>
								<option value="personal" ${
                                    category === 'personal' ? 'selected' : ''
                                }>personal</option>
								<option value="study" ${category === 'study' ? 'selected' : ''}>study</option>
								<option value="health" ${
                                    category === 'health' ? 'selected' : ''
                                }>health</option>
							</select>
						</div>
						<div class="edit__input-group">
							<label for="task-status">Satus: </label>
							<select id="task-status" name="task_status" >
								<option value="pending" ${
                                    status === 'pending' ? 'selected' : ''
                                }>pending</option>
								<option value="finished" ${
                                    status === 'finished' ? 'selected' : ''
                                }>finished</option>
							</select>
						</div>
						<div class="edit__input-group">
							<label for="task_date">Due to: </label>
							<input
								id="task_date"
								type="datetime-local"
								name="task_due_to"
								value="${date ? date : ''}"
							/>
						</div>
						
					</div>
					<button class="edit__submit" type="submit">EDIT</button>
				</form>
			</div>
		</div>
		`;
}

if (taskName) taskName.focus();

btnMenu.addEventListener('click', toggleMenu);

function toggleMenu() {
    asideMenu.classList.toggle('hidden');
}

const deleteTask = async (button) => {
    const taskId = button.parentNode.querySelector('[name=taskId]').value;

    const taskElement = button.closest('.tasks__item ');

    try {
        await fetch(`/user/delete/${taskId}`, { method: 'DELETE' });
        taskElement.remove();
    } catch (error) {
        console.log(error);
    }
};

const editTask = async (button) => {
    const editPanel = true;
    const taskId = button.parentNode.querySelector('[name=taskId]').value;
    const taskElement = button.closest('.tasks__item ');

    const taskName = taskElement.querySelector('.tasks__name');
    const taskPriority = taskElement.querySelector('.tasks__priority');
    const taskCategory = taskElement.querySelector('.tasks__category');
    const taskStatus = taskElement.querySelector('.tasks__status');
    const taskDate = taskElement.querySelector('.tasks__due-to');

    document.body.insertAdjacentHTML(
        'beforeend',
        editElement(
            taskName.textContent,
            taskPriority.textContent,
            taskCategory.textContent,
            taskStatus.textContent,
            parseDateString(taskDate.textContent)
        )
    );

    console.log();

    document
        .querySelector('.edit__form')
        .addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            formData.append('taskId', taskId);

            try {
                const response = await fetch(`/user/edit/${taskId}`, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const { updatedTask } = await response.json();
                    taskName.textContent = updatedTask.name;
                    taskPriority.textContent = updatedTask.priority;
                    taskCategory.textContent = updatedTask.category;
                    taskStatus.textContent = updatedTask.status;
                    taskDate.textContent = updatedTask.dueToDate;

                    document.querySelector('.edit').remove();
                } else {
                    console.error('Error al actualizar la tarea');
                }
            } catch (error) {
                console.log(error);
            }
        });

    document
        .querySelector('.edit__close')
        .addEventListener('click', function () {
            document.querySelector('.edit').remove();
        });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && editPanel) {
            document.querySelector('.edit').remove();
        }
    });
};

function updateTask(taskElement, updatedTask) {}

function parseDateString(dateString) {
    if (dateString === 'not specified') return;
    const [datePart, timePart] = dateString.split(' - ');
    const [day, month, year] = datePart.split('/');
    const [hour, minutes] = timePart.split(':');

    return `${year}-${month}-${day}T${hour}:${minutes.split(' ')[0]}`;
}
