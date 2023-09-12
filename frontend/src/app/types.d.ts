export interface User {
  email: string;
  id: string;
  role: string;
  authChecked: boolean;
  current_organization: string;
}

export interface Organization {
  organization_name: string;
}

export interface authorizedUserData {
  user: User;
  organizations: Organization[];
  currentOrganization: string;
}
