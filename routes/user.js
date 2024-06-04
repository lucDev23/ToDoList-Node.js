'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';
import { body } from 'express-validator';
import * as auth from '../middleware/isAuth.js';

const router = express.Router();

router.get('/add-task', auth.isAuth, userController.getAddTask);

router.post(
    '/add-task',
    auth.isAuth,
    [body('task_name', 'Task name is required').notEmpty()],
    userController.postAddTask
);

router.get('/my-day', auth.isAuth, userController.getDayTasks);

router.get('/important', auth.isAuth, userController.getImportantTasks);

router.get('/planned', auth.isAuth, userController.getPlannedTasks);

router.get('/tasks-list', auth.isAuth, userController.getAllTasks);

router.get('/logout', auth.isAuth, userController.logout);

router.delete('/delete/:taskId', auth.isAuth, userController.deleteTask);

router.post('/edit/:taskId', auth.isAuth, userController.postEditTask);

export default router;
