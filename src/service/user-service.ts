import { api } from "../api/api";

export const UserService = {
  async getUserById(id: string) {
    const user = await api.get(`/api/user/${id}`);
    return user;
  },
  async getProfile() {
    const user = await api.get(`/api/users/profile`);
    return user;
  },
};
