import { Request, Response } from 'express';
import { createUser as createUserInDb } from '../model/user/createUser';
import { createOrganization as createOrganizationInDb } from '../model/organization/createOrganization';
import { createOrganizationUser as createOrganizationUserInDb } from '../model/organizationUser/createOrganizationUser';
import { deleteOrganizationUser as deleteOrganizationUserInDb } from '../model/organizationUser/deleteOrganizationUser';
import { v4 as uuidv4 } from 'uuid';
import { findOneUserByEmail } from '../model/user/findOneUserByEmail';
import { IUser } from '../model/user/IUser';
import { IOrganization } from '../model/organization/IOrganization';
import { IOrganizationUser } from '../model/organizationUser/IOrganizationUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const deleteOrganizationUser = async (req: Request, res: Response) => {
  const { organization_id, organization_user_id } = req.body;

  const organizationUserData: IOrganizationUser = {
    id: organization_user_id,
    organization_id
  };

  try {
    console.log('DELETE ENDPOINT HIT....');
    const user = deleteOrganizationUserInDb(
      organizationUserData.id,
      organizationUserData.organization_id
    );

    if (!user) throw 'Error deleting user.';

    return res.status(201).json({
      success: true,
      message: 'User deleted!',
      user
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error
    });
  }
};
