import Link from 'next/link'
import { UserInfo } from '../../interfaces/UserInfo'
import React from 'react'
import { Zoom } from '@mui/material'

import { useTranslation } from 'react-i18next'
import { UserDetailTooltip } from '../UserDetail/UserDetailTooltip'

interface UserCardProps {
  user: UserInfo
}

const UserCard = ({ user }: UserCardProps): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Zoom in={true} timeout={450} >
      <div className="flex place-content-center border-y-2 py-3">
        <UserDetailTooltip user={user}>
          <Link href={`/users/${user._id}`}>
            <img className='w-12 h-12 font-sans hover:cursor-pointer rounded-full'
              src = { user.photoUrl }
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = '/assets/Default-img.jpg'
              }}
            />
          </Link>
          <div className='flex flex-col ml-4 mr-6 hover:opacity-100 opacity-80'>
            <Link href={`/users/${user._id}`}>
              <span className='text-xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'>
                { user.displayName }
              </span>
            </Link>
            <div>
              <span className='text-gray-400 text-sm'>{t('components.user_card.organizer')}</span>
            </div>
          </div>
        </UserDetailTooltip>
      </div>
    </Zoom>
  )
}

export default UserCard
