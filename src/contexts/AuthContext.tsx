import React, { createContext, useCallback, useEffect, useState} from 'react';
import {auth, firebase} from '../services/firebase'


interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface AuthContextProps {
  user: User | undefined;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid, email} = user;

        if(!displayName || !photoURL || !email) {
          throw new Error("Missing information from Google Account.");
        }

        setUser({
          id: uid,
          email,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  },[])

  const signIn = useCallback(async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if(result.user){
      const {displayName, photoURL, uid, email} = result.user;

      if(!displayName || !photoURL || !email) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        email,
        name: displayName,
        avatar: photoURL
      })
    }

  }, []);

  // const signOut = useCallback(() => {
  //   localStorage.removeItem('@Letmeask:user');

  //   setUser({} as User);
  // }, []);

  return (
    <AuthContext.Provider
      value={{user, signIn}}
    >
      {children}
    </AuthContext.Provider>
  );
};
