import Cookies from "js-cookie";
import { ITokens } from "../types/user.types";

export const saveCookies = (tokens: ITokens) => {
  Cookies.set("refresh", tokens.refreshToken);
  Cookies.set("access", tokens.accessToken);
};

export const deleteTokens = () => {
  Cookies.remove("refresh");
  Cookies.remove("access");
};

export const getAccessToken = () => {
  return Cookies.get("access");
};
export const getRefreshToken = () => Cookies.get("refresh");

//TESTING

export const deleteAccessToken = () => {
  Cookies.remove("access");
};
export const deleteRefreshToken = () => {
  Cookies.remove("refresh");
};
