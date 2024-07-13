import { useEffect, useReducer, useState } from "react";
import { AuthContext, AuthDispatchContext } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useHardReloadAuth } from "./hooks/useHardReloadAuth";
import { RoutesByUser } from "./router/RoutesByUser";
import { IUser } from "./types/user.types";
import { useMutation } from "react-query";
import axios from "axios";
import { api, api2 } from "./api/api";

const initialAuth: { user: IUser | null; isLoading: boolean } = {
  user: null,
  isLoading: true,
};
const authorizationUrl = "https://oauth.yandex.ru/authorize";
const tokenUrl = "https://oauth.yandex.ru/token";
const clientId = "64609768488b45528f96e02dd56d5c8c"; // Замените на ваш Client ID
const redirectUri = "http://localhost:5173/auth";

const authConfig = {
  clientId,
  authorizationUrl,
  tokenUrl,
  redirectUri,
  scopes: ["login:email", "login:info"], // Укажите необходимые области доступа
};
export default function App() {
  const [auth, dispatch] = useReducer(authReducer, initialAuth);

  useHardReloadAuth(dispatch); // HardReloadCheckAuth with login/access-token

  

  const ff = useMutation("f", () =>
    api2.get(
      "https://login.yandex.ru/info"
    )
  );
  const [token, setToken] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = window.location;
    console.log(queryParams);
    const hash = window.location.hash.slice(1); // Удаляем #
    const params = new URLSearchParams(hash);

    const accessToken = params.get("access_token");
    setToken(accessToken);
    const token_type = params.get("token_type");
    setType(token_type);
    const expires_in = params.get("expires_in");
    const cid = params.get("cid");
    console.log(accessToken, token_type, expires_in);

    //http://localhost:5173/auth#access_token=y0_AgAAAAATnv4AAAnLWQAAAAEGenIjAAAzRjj-6vpD1q1Inpl8pAeLfWqDmg&token_type=bearer&expires_in=31479120&cid=wx08bw9epe7ezcx28hr03n6f84

    // if (queryParams.code) {
    //   exchangeCodeForToken(queryParams.code);
    // }
  }, []);

  return (
    <>
      <a
        href={
          "https://oauth.yandex.ru/authorize?response_type=token&client_id=64609768488b45528f96e02dd56d5c8c"
        }
      >
        GO
      </a>
      <button onClick={() => ff.mutate()}>G02</button>
      <AuthContext.Provider value={auth}>
        <AuthDispatchContext.Provider value={dispatch}>
          <BrowserRouter>
            <RoutesByUser />
          </BrowserRouter>
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

const authReducer = (
  auth: typeof initialAuth,
  action: { type: string; user: IUser }
) => {
  switch (action.type) {
    case "complete": {
      return { ...auth, user: action.user, isLoading: false };
    }
    case "pending": {
      return { ...auth, isLoading: true };
    }
    case "error": {
      return { ...auth, isLoading: false };
    }
    case "logout": {
      return { ...auth, user: null, isLoading: false };
    }

    default: {
      return { user: null, isLoading: false };
    }
  }
};
