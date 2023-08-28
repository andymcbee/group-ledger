import { Router } from 'express';
import {
  deleteOrganizationUser,
  createOrganizationUser
} from '../controllers/organizationController';
import { ensureRequestBodyHasRequiredFields } from '../services/middleware/ensureRequestBodyHasRequiredFields';
import { userRoleValidator } from '../services/middleware/userRoleValidator';

export const router = Router({ mergeParams: true });

//the coupled functionality here screws up filtering for required fields...
router.post('/user', createOrganizationUser);

//We won't need to pass org_u_id or org_id anymore... just plain usserId in param
// and then we can do a search with the org_id in the param as well to locate the unique user.
router.delete(
  '/user/:userId',
  ensureRequestBodyHasRequiredFields([
    'organization_user_id',
    'organization_id'
  ]),
  deleteOrganizationUser
);
