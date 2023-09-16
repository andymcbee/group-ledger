import { User, Organization, authorizedUserData } from "../app/types";
import { userApi } from "../api/user";

export const fetchCurrentUser =
  async (): Promise<authorizedUserData | null> => {
    try {
      const response = await userApi.me();

      const { user, organizations } = response.data;

      const defaultCurrentOrg = organizations[0];

      const userData: User = {
        email: user.email,
        role: defaultCurrentOrg.organization_user_role,
        id: user.id,
        current_organization: defaultCurrentOrg.organization_id,
      };
      const filteredOrganizations: Organization[] = organizations.map(
        (org) => ({
          organization_name: org.organization_name,
          organization_id: org.organization_id,
        })
      );

      const me: authorizedUserData = {
        user: userData,
        organizations: filteredOrganizations,
      };

      return me || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
