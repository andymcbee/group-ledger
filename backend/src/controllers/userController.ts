import { Request, Response } from 'express';
import { findOneUserByEmail } from '../model/user/findOneUserByEmail';
import { fetchUserPassword } from '../model/user/fetchUserPassword';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../model/user/IUser';
import { updateUser as updateUserInDb } from '../model/user/updateUser';
import { v4 as uuidv4 } from 'uuid';
import { createUser as createUserInDb } from '../model/user/createUser';
import { createOrganizationUser as createOrganizationUserInDb } from '../model/organizationUser/createOrganizationUser';
import { IOrganizationUser } from '../model/organizationUser/IOrganizationUser';
import { UserRole } from '../types/UserRole';
import { findOneOrganizationUser } from '../model/organizationUser/findOneOrganizationUser';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password, organization_id, user_role, user_name } =
      req.body;

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

    console.log(user_role);
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
      const passwordHash = bcrypt.hashSync(user_password, salt);
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

export const login = async (req: Request, res: Response) => {
  try {
    const { user_email, user_password } = req.body;

    const storedUserPasswordHash = await fetchUserPassword(user_email);

    //Might run into an issue here. I don't think bcrypt accepts null as a value.
    //If it throws an error... would that be an issue?... It would send a bad error message to frontend... but would that matter..
    //or is this only for undefined? Test it.

    const match = await bcrypt.compare(user_password, storedUserPasswordHash);

    if (!match) throw 'The username or password you entered is incorrect.';

    //Fetch User Details
    //Fetch User OrgIds
    //I think this is just the "me" logic?...

    const user = await findOneUserByEmail(user_email);

    const jwtExpiry = 86400;

    const jwtToken = await jwt.sign({ key: user.id }, process.env.JWT_SECRET, {
      expiresIn: jwtExpiry
    });

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: jwtExpiry * 1000 //maxAge is in MS
    });
    res.status(200).json({
      success: true,
      message: `Login successful!`,
      data: {
        user
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

export const updateUser = async (req: Request, res: Response) => {
  const { user_email, user_name, user_password } = req.body;
  const user_id = req.params.userId;

  console.log(user_id);
  // console.log(req.user_id);

  const userData: IUser = {
    id: user_id,
    email: user_email,
    name: user_name
  };

  if (user_password) {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(user_password, salt);
    userData.password = passwordHash;
  }

  try {
    // if (user_id !== req.user_id) throw 'Unauthorized to update this user';

    const user = await updateUserInDb(userData);

    console.log(user);

    res.status(200).json({
      success: true,
      message: `Update user successful!`,
      data: {
        user
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
