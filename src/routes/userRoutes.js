import express from 'express'
import {userCreate, homeRegister} from '../controllers/userController.js'

const router = express.Router();

router.post('/register', userCreate);
router.get('/register', homeRegister)

export default router;