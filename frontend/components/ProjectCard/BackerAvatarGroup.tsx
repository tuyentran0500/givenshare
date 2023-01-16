import { AvatarGroup } from '@mui/material'
import React, { FC } from 'react'
import { UserAvatarCard } from './UserAvatarCard'
interface BackerAvatarGroupProps {
  backers: Object
  maxCardNumber?: number
  cardSize?: number
}
export const BackerAvatarGroup: FC<BackerAvatarGroupProps> = ({ backers, maxCardNumber = 2, cardSize = 30 }): JSX.Element => {
  return (
        <AvatarGroup total={Object.keys(backers).length} className="flex justify-end"
          sx={{
            '& .MuiAvatar-root': { width: cardSize, height: cardSize, fontSize: 15 }
          }}
        >
          {
            Object.keys(backers).slice(0, maxCardNumber).map(userId => <UserAvatarCard key = {userId} userId={userId}/>)
          }
        </AvatarGroup>
  )
}
