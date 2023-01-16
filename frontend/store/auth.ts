import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, sendPasswordResetEmail, updateProfile } from 'firebase/auth'

import { auth } from '../firebase-config'
import axios from 'axios'
import { USER_API } from '../api/endpoint'
import { PostUserInfoResponse } from '../api/models/auth'
import { UserInfo } from '../interfaces/UserInfo'
import { getCurrentUserProfileInfo } from '../api/userAPI'
// Renaming all function with API-ending so that we wont confused them with functions in AuthContext.
export const loginWithEmailPasswordAPI = async (email: string, password: string): Promise<null | Error> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log(user)
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const signUpWithEmailPasswordAPI = async (email: string, password: string): Promise<UserInfo | Error | null> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    const res = await axios.post<PostUserInfoResponse>(USER_API, {
      _id: user.uid,
      displayName: user.email?.replace(/@.+/, ''),
      email: user.email
    })
    if (res.status === 201) {
      return res.data
    }
    return null
  } catch (error: any) {
    return new Error(error.message)
  }
}

export const loginWithGoogleAPI = async (): Promise<UserInfo | Error | null> => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    // check if we have already created user or not.
    const res = await getCurrentUserProfileInfo()
    if (res instanceof Error) { // first time logged in user
      const res = await axios.post<PostUserInfoResponse>(USER_API, {
        _id: user.uid,
        displayName: user.email?.replace(/@.+/, ''),
        email: user.email,
        photoUrl: user.photoURL
      })
      if (res.status === 201) {
        return res.data
      }
    }
    console.log(user, token)
  } catch (error: any) {
    return new Error(error.message)
  }
  return null
}

export const loginWithFacebookAPI = async (): Promise<any> => {
  try {
    const provider = new FacebookAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = FacebookAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    console.log(user, token)
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error)
    console.log(errorCode, errorMessage, credential)
    return errorMessage
  }
}

export const passwordResetAPI = async (email: string): Promise<any> => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return errorMessage
  }
}

export const logoutAPI = async (): Promise<boolean> => {
  try {
    await auth.signOut()
    return true
  } catch (error: any) {
    return false
  }
}
