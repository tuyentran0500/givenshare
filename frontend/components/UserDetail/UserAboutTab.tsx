import Divider from '@mui/material/Divider'
import React from 'react'
import { UserInfo } from '../../interfaces/UserInfo'
import { TextField } from '@material-ui/core'
import { Zoom } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { EditUserDetail } from './EditUserDetail'
import { useAuthContext } from '../../contexts/Auth'
interface UserAboutTabProps {
  user: UserInfo
}
export const UserAboutTab = ({ user }: UserAboutTabProps): JSX.Element => {
  const { t } = useTranslation()
  const { user: authUser } = useAuthContext()
  return (
    <Zoom in={true}>
      <div className='ml-4'>
        <div className='mb-6 text-black text-xl font-bold'>{t('page.user_detail.biography')}</div>
        <div className="flex mb-4 flex-col md:flex-row">
            <div className='text-gray-500 font-bold w-48'>{t('page.user_detail.biography')}</div>
            <TextField className="w-full"
              InputProps={{
                disableUnderline: true,
                readOnly: true
              }}
              value={user.biography}
            multiline></TextField>
        </div>
        <Divider className='mb-4'></Divider>
        <div className='mb-6 text-black text-xl font-bold'>{t('page.user_detail.contact')}</div>
        <div className="flex mb-4 flex-col md:flex-row">
            <div className='text-gray-500 font-bold w-48'>{t('page.user_detail.phone')}</div>
            <div>{user.phone}</div>
        </div>
        <div className="flex mb-4 flex-col md:flex-row">
            <div className='text-gray-500 font-bold w-48'>{t('page.user_detail.websites')}</div>
            <div className='flex flex-col'>
                {user.website.length === 0 && <div>{t('page.user_detail.no_website')}</div>}
                {user.website.map(site => <a className="text-sky-600 hover:underline" href = {site.value} key={site.value}>{site.value}</a>)}
            </div>
        </div>
        {user._id === authUser._id && <EditUserDetail/>}
      </div>
    </Zoom>
  )
}
export default UserAboutTab
