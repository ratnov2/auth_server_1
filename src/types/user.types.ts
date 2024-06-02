export interface IUser {
  avatar: "";
  email: "";
  firstName: "";
  isAdmin: boolean;
  lastName: string;
}

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}

export interface ITokensUser extends ITokens {
  user: IUser;
}
