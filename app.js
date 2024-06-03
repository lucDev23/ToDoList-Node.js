'use strict';

// LIBRARIES
import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import multer from 'multer';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// ROUTES
import mainRoutes from './routes/main.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

// CONTROLLERS
import * as errorController from './controllers/error.js';

// MODELS
import User from './models/user.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const upload = multer();

const MONGODB_URI =
    'mongodb+srv://luDev23:luDev23App@task-manager.mr2bpef.mongodb.net/test?retryWrites=true&w=majority&appName=task-manager';
const PORT = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.none());

app.use(
    session({
        secret: 'mySecretKey',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({
            mongoUrl: MONGODB_URI,
            collectionName: 'sessions',
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);

app.use(async (req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    try {
        req.user = await User.findById(req.session.user._id);
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

try {
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.log('l44 app.js: ', error);
}
