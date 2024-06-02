import { useEffect } from "react";
import { AuthService } from "../service/auth-service";
import { deleteTokens, getRefreshToken, saveCookies } from "../api/save-token";

export const useHardReloadAuth = (dispatch: any) => {
  useEffect(() => {
    let ignore = false;
    const cheakAuth = async () => {
      try {
        const response = await AuthService.newTokens();
        if (!ignore) {
          dispatch({ type: "complete", user: response });
          console.log(response.accessToken);
          
          saveCookies({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          });
        }
      } catch (e) {
        if ((e as any).response.status === 401) {
          dispatch({ type: "logout" });
          return deleteTokens();
        }
        dispatch({ type: "error" });
      }
    };

    const refreshToken = getRefreshToken();

    if (refreshToken) {
      cheakAuth();
    } else {
      deleteTokens();
      dispatch({ type: "logout" });
    }

    return () => {
      ignore = true;
    };
  }, []);
};
