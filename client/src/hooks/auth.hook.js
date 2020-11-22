import { useState, useCallback, useEffect } from 'react';

const AUTH_STORAGE_NAME = 'auth';

/**
 * Module that handles sign in/sign out process for a user in the system 
 */
export const useAuth = () => {
  const [token, setToken] = useState(undefined);
  const [userId, setUserId] = useState(undefined);
  
  /**
   * @param jwtToken token
   * @param id userId
   */
  const signIn = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(AUTH_STORAGE_NAME, JSON.stringify({
      token: jwtToken, userId: id
    }));
  }, []);

  const signOut = useCallback(() => {
    setToken(undefined);
    setUserId(undefined);
    localStorage.removeItem(AUTH_STORAGE_NAME);
  }, []);

  useEffect(() => {
    const storageAuth = JSON.parse(localStorage.getItem(AUTH_STORAGE_NAME));
    if (storageAuth) {
      const { token, userId } = storageAuth;

      if (token) {
        signIn(token, userId);
      }
    }
  }, [signIn])

  return { signIn, signOut, token, userId };
};
