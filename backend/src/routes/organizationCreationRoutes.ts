import { Router } from 'express';
import { createOrganization } from '../controllers/organizationCreationController';

export const router = Router();

router.post('/', createOrganization);
