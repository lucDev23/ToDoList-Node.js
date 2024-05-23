import express from 'express';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import mainRoutes from './routes/main.js';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import * as errorController from './controllers/error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRoutes);
app.use(mainRoutes);
app.use(authRoutes);

app.use(errorController.get404);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
