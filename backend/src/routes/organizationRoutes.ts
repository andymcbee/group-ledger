import { Router } from 'express';
import { deleteOrganizationUser } from '../controllers/organizationController';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';
import { userRoleValidator } from '../services/middleware/userRoleValidator';

export const router = Router();

router.delete(
  '/:organizationId/user',
  ensureRequestBodyHasRequiredFields([
    'organization_user_id',
    'organization_id'
  ]),
  deleteOrganizationUser
);
