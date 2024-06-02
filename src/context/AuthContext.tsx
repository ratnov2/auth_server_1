import { Dispatch, createContext } from "react";
import { IUser } from "../types/user.types";

export const AuthContext = createContext(
  {} as { user: IUser | null; isLoading: boolean }
);
export const AuthDispatchContext = createContext({} as Dispatch<any>);
