import axios from "axios";
import {
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  saveCookies,
} from "./save-token";
import { AuthService } from "../service/auth-service";

export const baseApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const api2 = axios.create({
  baseURL: "https://oauth.yandex.ru",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/x-www-form-urlencoded",
    "Authorization":'OAuth y0_AgAAAAATnv4AAAnLWQAAAAEGenIjAAAzRjj-6vpD1q1Inpl8pAeLfWqDmg'
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = getAccessToken(); // Получаем актуальный токен
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    // Проверка, что ошибка связана с аутентификацией и что это не повторный запрос на обновление токена и что есть refresh token
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;
      try {
        const newToken = await AuthService.newTokens(); // Функция для получения нового токена
        saveCookies({
          accessToken: newToken.data.accessToken,
          refreshToken: newToken.data.refreshToken,
        });
        return api(originalRequest); // Повторный запрос с новым токеном
      } catch (tokenRefreshError) {
        if ((tokenRefreshError as any).response.status === 401) {
          deleteTokens();
        }
        //cheak other errors

        // Обработка ошибки при обновлении токена
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);
