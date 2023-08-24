import { Request, Response } from 'express';
import { createUser as createUserInDb } from '../model/user/createUser';
import { createOrganization as createOrganizationInDb } from '../model/organization/createOrganization';
import { createOrganizationUser as createOrganizationUserInDb } from '../model/organizationUser/createOrganizationUser';
import { v4 as uuidv4 } from 'uuid';
import { findOneUserByEmail } from '../model/user/findOneUserById';
import { IUser } from '../model/user/IUser';
import { IOrganization } from '../model/organization/IOrganization';
import { IOrganizationUser } from '../model/organizationUser/IOrganizationUser';

export const createUser = async (req: Request, res: Response) => {
  console.log('This isnt setup yet!');
};
