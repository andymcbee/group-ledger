import { createLedger, deleteLedger } from '../controllers/ledgerController';
import { Router } from 'express';
import { userAuth } from '../services/middleware/userAuth';
import { userRoleValidator } from '../services/middleware/userRoleValidator';

export const router = Router();

router.post('/', userAuth, userRoleValidator(['Admin', 'User']), createLedger);
router.delete('/:ledger_id', userAuth, deleteLedger);
