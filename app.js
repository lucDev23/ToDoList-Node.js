'use strict';

// LIBRARIES
import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// ROUTES
import mainRoutes from './routes/main.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import * as errorController from './controllers/error.js';
import User from './models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    if (req.user) {
        return next();
    }
    try {
        req.user = await User.findOne();
        return next();
    } catch (error) {
        console.log('l36 app.js: ', error);
    }
});

app.use('/user', userRoutes);
app.use(mainRoutes);
app.use('/auth', authRoutes);

app.use(errorController.get404);

// DATA BASE CONNECTION

const MONGODB_URI =
    'mongodb+srv://luDev23:luDev23App@task-manager.mr2bpef.mongodb.net/?retryWrites=true&w=majority&appName=task-manager';
const PORT = 3000;

try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log('l44 app.js: ', error);
}
