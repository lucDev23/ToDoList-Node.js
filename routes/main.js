'use strict';

import express from 'express';
import * as mainController from '../controllers/main.js';
import * as auth from '../middleware/isAuth.js';

const router = express.Router();

router.get('/', auth.loggedIn, mainController.getIndex);

export default router;
