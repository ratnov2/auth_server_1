import { UserPage } from "../components/UserPage";
import { NoFound } from "../components/NoPage";
import Main from "../components/Main";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../components/Auth";
import { AdminPage } from "../components/AdminPage";

export const useRouterEffect = () => {
  const auth = useContext(AuthContext);
  const [routes, setRoutes] = useState<typeof userPages>(otherPages);
  const ref = useRef<null | boolean>(null);
  useEffect(() => {
    const routes = [];
    //if (auth.isLoading) return; // for optimization first render
    if (auth.user) {
      if (auth.user.isAdmin === ref.current) return; //for optimization
      ref.current = auth.user.isAdmin;
      switch (auth.user.isAdmin) {
        case true:
          routes.push(...adminPages, ...userPages);
          break;
        case false:
          routes.push(...userPages);
          break;
      }
    }
    routes.push(...otherPages);
    setRoutes([...routes]);
  }, [auth.user]);

  return { routes };
};

const userPages = [{ path: "/user", element: <UserPage /> }];
const adminPages = [{ path: "/admin", element: <AdminPage /> }];
const otherPages = [
  { path: "/", element: <Main /> },
  { path: "/auth", element: <Auth /> },
  { path: "/*", element: <NoFound /> },
];

export interface IRoute {
  path: string;
  element: JSX.Element;
}
