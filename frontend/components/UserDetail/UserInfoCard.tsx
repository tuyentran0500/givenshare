import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserInfo } from '../../interfaces/UserInfo'
import ImageLoader from '../Common/ImageLoader'
interface UserInfoCardProps {
  user: UserInfo
}
export const UserInfoCard = ({ user }: UserInfoCardProps): JSX.Element => {
  const { t } = useTranslation()
  const formattedCreatedAt = new Date(user.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <div className='flex flex-col items-center mb-6 ml:44 md:ml-64'>
      <ImageLoader src={user.photoUrl} className="p-2 w-40 h-40 rounded-full" />
      {/* <img src={user.photoUrl} className="p-2 w-40 h-40 rounded-full"></img> */}
      <div className="font-bold text-2xl text-gray-600">{user.displayName}</div>
      <div className="text-lg text-gray-600">{user.location}</div>
      <div className="text-lg text-gray-600">{t('page.user_detail.joined')} {formattedCreatedAt}</div>
    </div>
  )
}
export default UserInfoCard
