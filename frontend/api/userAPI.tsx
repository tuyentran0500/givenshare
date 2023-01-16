import { auth } from '../firebase-config'
import axios from 'axios'
import { UserInfo } from '../interfaces/UserInfo'
import { USER_API } from './endpoint'
import { GetUserInfoResponse, PatchUserInfoResponse } from './models/auth'

export const getCurrentUserProfileInfo = async (): Promise<UserInfo | Error | null> => {
  const user = auth.currentUser
  if (user === null) return null

  try {
    const res = await axios<GetUserInfoResponse>(USER_API + user.uid)
    if (res.status === 200) {
      return res.data
    }
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
    return new Error(errorMessage)
  }
  return null
}

export const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
  try {
    const res = await axios<GetUserInfoResponse>(USER_API + userId)
    if (res.status === 200) {
      return res.data
    }
  } catch (error: any) {}
  return null
}

export const uploadUserAvatar = async (avatarData: FormData): Promise<string | null> => {
  try {
    const result = await axios.post(
      USER_API + 'uploadAvatar',
      avatarData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}

export const updateUserInfo = async (userData: Partial<UserInfo>): Promise<UserInfo | null> => {
  try {
    const user = auth.currentUser
    if (user == null) return null
    const res = await axios.patch<PatchUserInfoResponse>(USER_API + user.uid, userData)
    if (res.status === 200) {
      return res.data
    }
  } catch (error: any) {
    const errorCode = error.code
    const errorMessage = error.message
    console.log(errorCode, errorMessage)
  }
  return null
}
