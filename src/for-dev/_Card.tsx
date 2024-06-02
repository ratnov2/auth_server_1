import { Button, Card } from "react-bootstrap";
import {
  deleteAccessToken,
  deleteRefreshToken,
  deleteTokens,
  getAccessToken,
  getRefreshToken,
} from "../api/save-token";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthDispatchContext } from "../context/AuthContext";
import { FC, ReactNode, useContext } from "react";
import { LoadingWithComponent } from "../loader/LoadingWithComponent";
import { IRoute } from "../router/useRouterEffect";

interface IDEV_Card {
  children: ReactNode;
  routes: IRoute[];
}

export const DEV_Card: FC<IDEV_Card> = ({ children, routes }) => {
  // --------For Development --------------------------------///
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  // --------For Development --------------------------------///
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const dispatch = useContext(AuthDispatchContext);
  return (
    <div style={{ display: "flex", padding: 40 }}>
      <Card style={{ width: 500, padding: 20 }}>
        {" "}
        <Card style={{ padding: 20 }}>
          <h1>Non-Reactive Elements</h1>
          <Button onClick={() => deleteTokens()}>DELETE TOKENS</Button>
          <Button style={{ marginTop: 10 }} onClick={() => deleteAccessToken()}>
            DELETE ACCESS TOKEN
          </Button>
          <Button
            style={{ marginTop: 10 }}
            onClick={() => deleteRefreshToken()}
          >
            DELETE REFRESH TOKEN
          </Button>
        </Card>
        <h4>Access Token</h4>
        <p>{accessToken}</p>
        <h4>Refresh Token</h4>
        <p>{refreshToken}</p>
        <Button onClick={() => navigate("/user")}>UserPage</Button>
        <Button style={{ marginTop: 10 }} onClick={() => navigate("/")}>
          Main
        </Button>
        <Button style={{ marginTop: 10 }} onClick={() => navigate("/admin")}>
          Admin Page
        </Button>
        <Button style={{ marginTop: 10 }} onClick={() => navigate("/auth")}>
          Auth Page
        </Button>
        <Button
          style={{ marginTop: 10 }}
          onClick={() => {
            dispatch({ type: "logout" });
            deleteTokens();
            navigate("/");
          }}
        >
          Logout
        </Button>
        {auth.user && (
          <Button
            style={{ marginTop: 10 }}
            onClick={() =>
              dispatch({
                type: "complete",
                user: { ...auth.user, isAdmin: true },
              })
            }
          >
            became an Admin
          </Button>
        )}
        <p>{JSON.stringify(auth.user, null, 3)}</p>
      </Card>
      <LoadingWithComponent routes={routes}>{children}</LoadingWithComponent>
    </div>
  );
};
