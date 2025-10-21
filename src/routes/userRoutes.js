import express from 'express'
import {userCreate, homeRegister, homeLogin, userLogin} from '../controllers/userController.js'

const router = express.Router();

router.post('/register', userCreate);
router.get('/register', homeRegister);
router.get('/login', homeLogin);
router.post('/login', userLogin);

export default router;