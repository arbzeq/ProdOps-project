export interface IUser {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
