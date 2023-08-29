import { login, updateUser, me } from '../controllers/userController';
import { Router } from 'express';
import { userAuth } from '../services/middleware/userAuth';

export const router = Router();

router.post('/login', login);
router.patch('/:userId', userAuth, updateUser);
router.post('/me', userAuth, me);
