'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/add-task', userController.getAddTask);

router.post(
    '/add-task',
    [body('task_name', 'Task name is required').notEmpty()],
    userController.postAddTask
);

router.get('/my-day', userController.getDayTasks);

router.get('/important', userController.getImportantTasks);

router.get('/planned', userController.getPlannedTasks);

router.get('/tasks-list', userController.getAllTasks);

router.get('/logout', userController.logout);

router.get('/delete/:taskId', userController.deleteTask);

export default router;
