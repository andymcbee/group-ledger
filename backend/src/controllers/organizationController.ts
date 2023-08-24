import { Request, Response } from 'express';
import { createUser as createUserInDb } from '../model/user/createUser';
import { createOrganization as createOrganizationInDb } from '../model/organization/createOrganization';
import { createOrganizationUser as createOrganizationUserInDb } from '../model/organizationUser/createOrganizationUser';
import { v4 as uuidv4 } from 'uuid';
import { findOneUserByEmail } from '../model/user/findOneUserById';
import { IUser } from '../model/user/IUser';
import { IOrganization } from '../model/organization/IOrganization';
import { IOrganizationUser } from '../model/organizationUser/IOrganizationUser';

export const createOrganization = async (req: Request, res: Response) => {
  const { user_name, user_email, user_password, organization_name } = req.body;

  const userData: IUser = {
    name: user_name ? user_name : null,
    email: user_email,
    password: user_password,
    id: uuidv4()
  };

  const organizatonData: IOrganization = {
    name: organization_name,
    id: uuidv4()
  };

  try {
    //Validate if email or password is missing

    if (!user_email) throw 'Please provide an email.';
    if (!user_password) throw 'Please provide a password.';
    if (user_password.length < 3)
      throw 'Password must be at least 3 characters.';

    //Check if email is already in use

    const existingUser = await findOneUserByEmail(user_email);
    if (existingUser) throw 'Email in use. Try again.';

    //Create Org
    const organization = await createOrganizationInDb(organizatonData);

    //Create User
    const user = await createUserInDb(userData);

    //Create OrgUser

    const organizationUserData: IOrganizationUser = {
      user_id: user.id,
      organization_id: organization.id,
      id: uuidv4()
    };

    await createOrganizationUserInDb(organizationUserData);

    return res.status(201).json({
      success: true,
      message: 'New user created!',
      user,
      organization
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error
    });
  }
};
