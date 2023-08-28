import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { findOneOrganizationUser } from '../../model/organizationUser/findOneOrganizationUser';

// This middleware performs the actions:
// Confirm JWT is valid.
// Confirm the provided organization_id is valid.
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { organizationId } = req.params;
  const jwtToken = req.cookies.jwt; // Assuming the JWT is stored in a "token" cookie

  console.log('REQ PARAMS INSIDE OF USER AUTH MIDDLEWARE:::');
  console.log(organizationId);

  if (!jwtToken || !organizationId) {
    return res.status(401).json({ message: 'Authentication denied.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key
    const decoded = await jwt.verify(jwtToken, secretKey); // Modify according to your token structure

    // Attach the decoded data to the request object
    req.user_id = decoded.key;

    //fetch org_id from db
    const valid_organization_id = await findOneOrganizationUser(
      decoded.key,
      organizationId
    );

    req.user_role = valid_organization_id.user_role;

    if (!valid_organization_id) {
      return res.status(401).json({ message: 'Authentication denied!' });
    }

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.log('ERROR IN USER AUTH:::::::::::::::::');
    console.log(error);
    return res.status(403).json({ message: 'Invalid auth' });
  }
};
