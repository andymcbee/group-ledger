import { login, updateUser } from '../controllers/userController';
import { Router } from 'express';
import { userAuth } from '../services/middleware/userAuth';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';

export const router = Router();

router.post('/login', login);
router.patch('/:userId', userAuth, updateUser);
