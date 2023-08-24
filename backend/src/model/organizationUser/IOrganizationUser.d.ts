export interface IBaseOrganizationUser {
  user_id: string;
  organization_id: string;
  created_at?: Date;
}

export interface IOrganizationUser extends IBaseOrganizationUser {
  id: string;
}
