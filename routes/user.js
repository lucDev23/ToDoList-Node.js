'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.post('/add-task', userController.postAddTask);

router.get('/logout', userController.logout);

router.get('/important', userController.getImportantTasks);

router.get('/my-day', userController.getDayTasks);

router.get('/planned', userController.getPlannedTasks);

router.get('/add-task', userController.getAddTask);

router.get('/tasks-list', userController.getAllTasks);

export default router;
