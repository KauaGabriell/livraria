import express from 'express'
import {userCreate, homeRegister, homeLogin} from '../controllers/userController.js'

const router = express.Router();

router.post('/register', userCreate);
router.get('/register', homeRegister);
router.get('/login', homeLogin);

export default router;