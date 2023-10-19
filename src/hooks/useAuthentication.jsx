import { db } from '../firebase/config';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, settLoading] = useState(null);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();
    settLoading(true);
    setError(null);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, { displayName: data.displayName });
      settLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);
      let systemErrorMessage;
      if (error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
      } else if (error.message.includes('email')) {
        systemErrorMessage = 'E-mail inválido';
      } else {
        systemErrorMessage = 'Ocorreu um erro';
      }
      settLoading(false);
      setError(systemErrorMessage);
    }
  };

  // Logout - sign out

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  // Login - sign in

  const login = async (data) => {
    checkIfIsCancelled();
    settLoading(true);
    setError(false);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      settLoading(false);
    } catch (error) {
      let errorMessage;
      if (error.message.includes('invalid')) {
        errorMessage = 'Email ou senha inválido';
      }
      
      setError(errorMessage);
      console.log(error);
      settLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
