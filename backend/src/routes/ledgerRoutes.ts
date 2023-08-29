import { Router } from 'express';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';
import { createLedger, deleteLedger } from '../controllers/ledgerController';
import { router as ledgerTransactionRouter } from './ledgerTransactionRouter';

export const router = Router({ mergeParams: true });

router.post('/', createLedger);
router.delete('/:ledger_id', deleteLedger);

//LEDGER TRANSACTION ENDPOINTS

router.use('/:ledger_id/transaction', ledgerTransactionRouter);
