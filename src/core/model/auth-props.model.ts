import { AuthStateModel } from "./auth-state.model";

export interface AuthActionProps {
  state: AuthStateModel;
  login: (token: string) => void;
  logout: () => void;
}
