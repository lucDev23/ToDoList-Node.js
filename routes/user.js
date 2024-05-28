'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.get('/add-task', userController.getAddTask);

router.post('/add-task', userController.postAddTask);

router.get('/my-day', userController.getDayTasks);

router.get('/important', userController.getImportantTasks);

router.get('/planned', userController.getPlannedTasks);

router.get('/tasks-list', userController.getAllTasks);

router.get('/logout', userController.logout);

export default router;
