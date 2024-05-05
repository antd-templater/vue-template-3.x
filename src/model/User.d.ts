/**
 * User Info
 */
declare interface UserInfo {
  userNo?: string | null;
  userName?: string | null;
  mobilePhone?: string | null;
  avatar?: string | null;
  postName?: string | null;
  role?: UserRole | null;
  orgId?: string | null;
  orgName?: string | null;
  deptName?: string | null;
  deptId?: string | null;
  dataFlag?: string | null;
  activity?: string | null;
}

/**
 * User Role
 */
declare interface UserRole {
  permissionList: Array<string>;
  permissions: Array<{
    roleId: string;
    permissionId: string;
    actionEntitySet: Array<{ action: string; describe: string; }>;
    actionList: Array<string>;
  }>;
}
