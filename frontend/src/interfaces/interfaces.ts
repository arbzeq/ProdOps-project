export interface IUser {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, isAdmin: boolean) => void;
  logout: () => void;
  username: string;
  isAdmin: boolean;
}