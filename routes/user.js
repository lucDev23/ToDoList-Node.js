'use strict';

import express from 'express';
import * as userController from '../controllers/user.js';

const router = express.Router();

router.get('/', userController.getIndex);

export default router;
