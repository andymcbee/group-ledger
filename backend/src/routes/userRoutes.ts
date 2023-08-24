import { createUser } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/', createUser);

module.exports = router;
