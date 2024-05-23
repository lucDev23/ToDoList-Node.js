import express from 'express';
import * as authController from '../controllers/auth.js';

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

export default router;
