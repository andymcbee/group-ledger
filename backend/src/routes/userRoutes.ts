import { createUser, login, updateUser } from '../controllers/userController';
import { Router } from 'express';
import { userAuth } from '../services/middleware/userAuth';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';

export const router = Router();

router.post(
  '/',
  userAuth,
  ensureRequestBodyHasRequiredFields([
    'user_email',
    'organization_id',
    'user_role'
  ]),
  createUser
);
router.post('/login', login);
router.patch('/:userId', userAuth, updateUser);
