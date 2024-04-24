/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";

import { api } from "../services/api";

interface IUser {
  token: string;
  user: {
    email: string;
    name: string;
  };
}

interface IAuthContext {
  user: IUser | null;
  signIn(email: string, password: string): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);

  const keyStorageUser = "@user";

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("login", {
        email,
        password,
      });

      const userInfo = {
        token: data.token,
        user: data.user,
      };

      localStorage.setItem(keyStorageUser, JSON.stringify(userInfo));
      setUser(userInfo);

      api.defaults.headers.common["Authorization"] = `Bearer ${userInfo.token}`;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  }

  function logOut() {
    localStorage.clear();
    setUser(null);
  }

  useEffect(() => {
    function checkIfUserIsLoggedIn() {
      const storedUser = localStorage.getItem(keyStorageUser);

      if (storedUser) {
        const userInfo = JSON.parse(storedUser);
        setUser(userInfo);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userInfo.token}`;
      }
    }

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
