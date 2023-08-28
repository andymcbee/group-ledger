import { Request, Response } from 'express';
import { createUser as createUserInDb } from '../model/user/createUser';
import { createOrganizationUser as createOrganizationUserInDb } from '../model/organizationUser/createOrganizationUser';
import { deleteOrganizationUser as deleteOrganizationUserInDb } from '../model/organizationUser/deleteOrganizationUser';
import { v4 as uuidv4 } from 'uuid';
import { findOneUserByEmail } from '../model/user/findOneUserByEmail';
import { IUser } from '../model/user/IUser';
import { IOrganizationUser } from '../model/organizationUser/IOrganizationUser';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/UserRole';
import { findOneOrganizationUser } from '../model/organizationUser/findOneOrganizationUser';

export const createOrganizationUser = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const { user_email, user_role, user_name } = req.body;
    const { organizationId: organization_id } = req.params;

    const existingUser = await findOneUserByEmail(user_email);

    const userData: IUser = {
      id: existingUser ? existingUser.id : uuidv4(),
      email: user_email,
      name: user_name
    };

    if (existingUser) {
      const existingOrgUser = await findOneOrganizationUser(
        userData.id,
        organization_id
      );

      if (existingOrgUser) throw 'User exists in organization already.';
    }

    // This checks to ensure the new user's role is valid before creation.
    // It is not validating the current user's role.
    if (
      user_role !== 'Admin' &&
      user_role !== 'User' &&
      user_role !== 'Read Only'
    ) {
      console.log('IF TRIGGERED.');
      throw 'Invalid role.';
    }

    if (!existingUser) {
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(process.env.TEMP_USER_PW, salt);
      userData.password = passwordHash;
      await createUserInDb(userData);
      //Remove password from userData obj for safety
      delete userData.password;
    }

    const organizationUserData: IOrganizationUser = {
      user_id: userData.id,
      organization_id,
      user_role: user_role as UserRole,
      id: uuidv4()
    };

    const orgUser = await createOrganizationUserInDb(organizationUserData);

    res.status(200).json({
      success: true,
      message: `User created successfully!`,
      data: {
        user: userData,
        organization_user: orgUser
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error
    });
  }
};

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
