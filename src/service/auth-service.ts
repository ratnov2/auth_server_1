import { api, baseApi } from "../api/api";
import { getRefreshToken } from "../api/save-token";
import { ITokensUser } from "../types/user.types";
import { server_login, server_check_auth } from "../api/server.js";

export const AuthService = {
  async login(data: ILogin) {
    const login = await server_login(data);
    return login;
  },

  async register(data: ILogin) {
    const login = await api.post<ITokensUser>(`/api/auth/register`, data);
    return login;
  },
  async newTokens() {
    const data = { refreshToken: getRefreshToken() };
    const tokens = await server_check_auth(data);

    return tokens;
  },
};

export interface ILogin {
  email: string;
  password: string;
}
