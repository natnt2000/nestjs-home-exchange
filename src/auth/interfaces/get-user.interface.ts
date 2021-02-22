export interface GetUserInterface {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: any;
  phoneNumber?: string;
  verifiedByEmail?: boolean;
  verifiedByPhoneNumber?: boolean;
  responseRate?: number;
  lastVisit?: any;
  memberSince?: any;
  guestPoints?: number;
}
