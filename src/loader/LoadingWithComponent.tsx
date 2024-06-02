import {
  FC,
  ReactNode,
  useContext,
  useLayoutEffect,
} from "react";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { IRoute } from "../router/useRouterEffect";

export const LoadingWithComponent: FC<{
  children: ReactNode;
  routes: IRoute[];
}> = ({ children, routes }) => {
  const auth = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  //const [isroutes,pathnameg, setIsLoading] = useState(true); //from auth.isLoading is true
  //let isLoading = routes.find(()=>);
  // useEffect(() => {
  //   const id = setTimeout(() => {
  //     setLoad(false);
  //   }, 3000);
  //   return () => {
  //     clearTimeout(id);
  //   };
  // }, [auth.isLoading]); for custom load delay

  ///// --------- NEXT OPTIMAZATION: SHARE IN MEMOIZATION----------/////////

  // if (!auth.isLoading) {
  //   if (auth.user && pathname === "/auth") {
  //     /// and other routes by redirect
  //     (() => navigate("/user"))();
  //   }
  //   console.log(auth.user, routes);

  //   if (!auth.user && pathname === "/user") {
  //     /// and other routes by redirect
  //     (() => navigate("/auth"))();
  //   }
  // }

  useLayoutEffect(() => {
    if (!auth.isLoading) {
      if (auth.user && pathname === "/auth") {
        navigate("/user");
      } else if (!auth.user && pathname === "/user") {
        navigate("/auth");
      }
    }
  }, [auth.isLoading, auth.user, pathname]);

  //console.log(pathname);
  ///// --------- NEXT OPTIMAZATION: SHARE IN MEMOIZATION----------/////////

  if (auth.isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  return <div style={{ width: "100%",padding:'0 10px' }}>{children}</div>;
};
