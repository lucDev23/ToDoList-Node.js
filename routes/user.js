'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.get('/', userController.getIndex);

router.post('/add-task', userController.postAddTask);

router.get('/tasks-list', userController.getAllTasks);

export default router;
