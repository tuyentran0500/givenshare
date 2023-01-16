import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { useAuthContext } from '../../contexts/Auth'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export const UserInfoBar = (): JSX.Element => {
  const { t } = useTranslation()
  const { user, logOut: handleLogout } = useAuthContext()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: any): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="text-black normal-case mx-3 flex w-44"
      >
        <img
          className="w-8 h-8 rounded-full bg-gray-300 mr-4"
          src={`${user.photoUrl}`}
        />
        {user?.displayName.replace(/@.+/, '')}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        disableScrollLock={ true }
      >
        <Link href={`/users/${user._id}`} className="w-44"><MenuItem onClick={handleClose}>{t('components.user_navbar.profile')}</MenuItem></Link>
        <MenuItem onClick={handleLogout} className="w-44">{t('components.user_navbar.logout')}</MenuItem>
      </Menu>
    </>
  )
}
