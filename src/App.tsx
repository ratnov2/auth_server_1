import { useReducer } from "react";
import { AuthContext, AuthDispatchContext } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { useHardReloadAuth } from "./hooks/useHardReloadAuth";
import { RoutesByUser } from "./router/RoutesByUser";
import { IUser } from "./types/user.types";

const initialAuth: { user: IUser | null; isLoading: boolean } = {
  user: null,
  isLoading: true,
};

export default function App() {
  const [auth, dispatch] = useReducer(authReducer, initialAuth);

  useHardReloadAuth(dispatch); // HardReloadCheckAuth with login/access-token

  return (
    <>
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
