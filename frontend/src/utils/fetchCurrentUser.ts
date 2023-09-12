import { User, Organization, authorizedUserData } from "../app/types";
import { userApi } from "../api/user";

export const fetchCurrentUser =
  async (): Promise<authorizedUserData | null> => {
    try {
      const response = await userApi.me();

      const { user, organizations } = response.data;

      console.log(organizations);

      const defaultCurrentOrg = organizations[0];
      console.log("DEFAULT ORG.........");
      console.log(defaultCurrentOrg);

      const userData: User = {
        email: user.email,
        role: defaultCurrentOrg.organization_user_role,
        id: user.id,
        current_organization: defaultCurrentOrg.organization_id,
      };
      const filteredOrganizations: Organization[] = organizations.map(
        (org: any) => ({
          organization_name: org.organization_name,
          organization_id: org.organization_id,
        })
      );

      console.log("FILTERED ORGS:::");
      console.log(filteredOrganizations);

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
