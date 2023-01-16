import { LoadingButton } from '@mui/lab'
import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { UserDetailProvider, useUserDetailContext } from '../../contexts/UserDetail'
import { UserDetailTooltip } from '../UserDetail/UserDetailTooltip'
interface UserAvatarCardProps {
  userId: string
}
export const UserAvatarCard = ({ userId }: UserAvatarCardProps): JSX.Element => {
  return (
    <UserDetailProvider>
      <UserAvatar userId = {userId}/>
    </UserDetailProvider>
  )
}

export const UserAvatar = ({ userId }: UserAvatarCardProps): JSX.Element => {
  const { user, fetchUserStatus, fetchUserById } = useUserDetailContext()
  useEffect(() => {
    if (fetchUserStatus === 'idle') {
      void (async () => {
        await fetchUserById(userId)
      })()
    }
  }, [])
  if (fetchUserStatus === 'idle' || fetchUserStatus === 'loading') {
    return <LoadingButton loading/>
  }
  return (
    <UserDetailTooltip user = {user}>
      <Avatar src={user.photoUrl} className="hover:border-solid hover:border-blue-200 hover:border-2" />
    </UserDetailTooltip>
  )
}
