import React, { useEffect, useState, useContext } from 'react'

import { auth } from '../firebase-config'
import { getCurrentUserProfileInfo, updateUserInfo } from '../api/userAPI'
import { UserInfo } from '../interfaces/UserInfo'
import { AuthStatusType } from '../api/models/status'
import { loginWithGoogleAPI, logoutAPI, signUpWithEmailPasswordAPI } from '../store/auth'

interface AuthContext {
  user: UserInfo
  status: AuthStatusType
  updateInfo: (userData: Partial<UserInfo>) => Promise<boolean>
  signUp: (email: string, password: string) => Promise<Error | null>
  logOut: () => Promise<void>
  logInWithGoogle: () => Promise<Error | null>
}

const defaultUser: UserInfo = {
  _id: '',
  displayName: '',
  email: '',
  photoUrl: '',
  phone: '',
  location: '',
  created_date: new Date(Date.now()),
  biography: '',
  website: []
}

const initialState: AuthContext = {
  user: defaultUser,
  status: 'idle',
  updateInfo: async (defaultUser) => false,
  signUp: async () => null,
  logOut: async () => {},
  logInWithGoogle: async () => null
}

const Context = React.createContext<AuthContext>(initialState)

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo>(defaultUser)
  const [status, setStatus] = useState<AuthStatusType>('idle')
  const getInfo = async (): Promise<void> => {
    setStatus('loading')
    const data = await getCurrentUserProfileInfo()
    if (data instanceof Error) {
      setStatus('errored')
      return
    }
    if (data != null) {
      setUser({ ...data })
      setStatus('succeeded')
    } else {
      setStatus('notAuth')
    }
  }
  const updateInfo = async (userData: Partial<UserInfo>): Promise<boolean> => {
    const data = await updateUserInfo(userData)
    if (data != null) {
      setUser({ ...data })
      return true
    }
    return false
  }
  const logInWithGoogle = async (): Promise<Error | null> => {
    const data = await loginWithGoogleAPI()
    if (data instanceof Error) {
      setStatus('errored')
      return data
    }
    if (data != null) {
      setUser({ ...data })
      setStatus('succeeded')
    }
    return null
  }
  const signUp = async (email: string, password: string): Promise<Error | null> => {
    const data = await signUpWithEmailPasswordAPI(email, password)
    // return Error to handle in the FE login side.
    if (data instanceof Error) {
      setStatus('errored')
      return data
    }
    if (data != null) {
      setUser({ ...data })
      setStatus('succeeded')
    }
    return null
  }
  const logOut = async (): Promise<void> => {
    const res = await logoutAPI()
    if (res) {
      setUser(defaultUser)
      setStatus('notAuth')
    } else {
      console.log('Logout unsuccessful')
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      void getInfo()
    })
    if (status === 'idle') {
      return unsubscribe
    }
    if (status === 'errored') { void logOut() }
  }, [])
  return (<Context.Provider
    value={{
      user,
      status,
      updateInfo,
      signUp,
      logOut,
      logInWithGoogle
    }}
  >
    {children}
  </Context.Provider>)
}

export const useAuthContext = (): AuthContext => useContext(Context)
