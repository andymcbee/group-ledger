import { Router } from 'express';
import {
  createOrganization,
  deleteOrganizationUser
} from '../controllers/organizationController';
import { userAuth } from '../services/middleware/userAuth';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';
import { userRoleValidator } from '../services/middleware/userRoleValidator';

export const router = Router();

router.post('/', createOrganization);
router.delete(
  '/:organizationId/user',
  userAuth,
  ensureRequestBodyHasRequiredFields([
    'organization_user_id',
    'organization_id'
  ]),
  userAuth,
  deleteOrganizationUser
);
