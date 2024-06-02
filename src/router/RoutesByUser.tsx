import { Outlet, Route, Routes } from "react-router-dom";
import { DEV_Card } from "../for-dev/_Card";
import { useRouterEffect } from "./useRouterEffect";

export const RoutesByUser = () => {
  const { routes } = useRouterEffect();

  return (
    <Routes>
      <Route
        element={
          <>
            <DEV_Card routes={routes}>
              <Outlet />
            </DEV_Card>
          </>
        }
      >
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
