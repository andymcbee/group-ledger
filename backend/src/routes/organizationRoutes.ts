import { Router } from 'express';
import { createOrganization } from '../controllers/organizationController';

export const router = Router();

router.post('/', createOrganization);
