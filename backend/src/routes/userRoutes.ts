import { createUser, login, updateUser } from '../controllers/userController';
import { Router } from 'express';
import { userAuth } from '../services/middleware/userAuth';

export const router = Router();

router.post('/', createUser);
router.post('/login', login);
router.patch('/:userId', userAuth, updateUser);
