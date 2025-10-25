import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import errorHandler from '../middlewares/errorHandler.js';
import logger from '../utils/logger.js';
import routes from '../routes/home.js';
import userRoutes from '../routes/userRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session'; 
import MongoStore from 'connect-mongo';

dotenv.config();

const app = express();

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Uma chave secreta para assinar a sessão
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
      httpOnly: true
    }
  })
);


//Paths

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('dev', { stream: logger.stream }));

/** Definindo a engine do EJS */
app.set('views', path.resolve(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

// Routes
app.use('/', routes);
app.use('/users', userRoutes);

// Error Handling
app.use(errorHandler);

export default app;
