import { api, baseApi } from "../api/api";
import { getRefreshToken } from "../api/save-token";
import { ITokensUser } from "../types/user.types";

export const AuthService = {
  async login(data: ILogin) {
    const login = await api.post<ITokensUser>(`/api/auth/login`, data);
    return login;
  },

  async register(data: ILogin) {
    const login = await api.post<ITokensUser>(`/api/auth/register`, data);
    return login;
  },
  async newTokens() {
    const data = { refreshToken: getRefreshToken() };

    const tokens = await baseApi.post<ITokensUser>(
      `/api/auth/login/access-token`,
      data
    );

    return tokens;
  },
};

export interface ILogin {
  email: string;
  password: string;
}
