import { createContext } from 'react';

function noop() {}

export const AuthContext = createContext({
  token: undefined,
  userId: undefined,
  signIn: noop,
  signOut: noop,
  isAuth: false,
});
