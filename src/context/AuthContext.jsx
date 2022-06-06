import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  deleteUser,
  AuthErrorCodes,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile
} from 'firebase/auth'

export const authContext = createContext()

export const useAuth = () => {
  const context = useContext(authContext)
  if (!context) {
    throw new Error('Error, no hay un proveedor de autenticación.')
  }
  return context
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userUID, setUserUID] = useState(null)
  const [loading, setLoading] = useState(true)

  const register = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const loginWithGoogle = () => signInWithPopup(auth, new GoogleAuthProvider())

  const loginWithPhoneNumber = (phoneNumber, appVerifier) =>
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)

  const logout = () => signOut(auth)

  const updateUser = (user) => updateProfile(auth?.currentUser, user)

  const resetPassword = (email) => sendPasswordResetEmail(auth, email)

  const deleteAccount = () => deleteUser(auth.currentUser)

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setUserUID(currentUser?.uid ?? null)
      setLoading(false)
    })
  }, [])

  const valueToExport = {
    register,
    login,
    user,
    userUID,
    logout,
    loading,
    loginWithGoogle,
    resetPassword,
    deleteAccount,
    AuthErrorCodes,
    loginWithPhoneNumber,
    RecaptchaVerifier,
    updateUser
  }

  return <authContext.Provider value={valueToExport}>{children}</authContext.Provider>
}

export default AuthProvider
