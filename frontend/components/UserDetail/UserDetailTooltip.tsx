import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import { UserInfo } from '../../interfaces/UserInfo'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { Button, Divider } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { UserDetailProvider, useUserDetailContext } from '../../contexts/UserDetail'
import LoadingButton from '@mui/lab/LoadingButton'
import Link from 'next/link'
import PlaceIcon from '@mui/icons-material/Place'

interface UserDetailTooltipProps {
  user: UserInfo
  children: React.ReactNode
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: 400
  }
}))

export const UserDetailTooltip = ({ user, children }: UserDetailTooltipProps): JSX.Element => {
  const [open, setOpen] = useState(false)
  const handleOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  return (
    <UserDetailProvider>
        <Link href={`/users/${user._id}`}>
          <span>
            <LightTooltip title={<UserTooltipCard user={user} open={open}/>} placement="bottom-start" open={open} onClose={handleClose} onOpen={handleOpen}>
              <Button className='hover:text-gray-400 bg-transparent text-black normal-case hover:bg-transparent p-0 min-w-fit'>
                {children}
              </Button>
            </LightTooltip>
          </span>
        </Link>
    </UserDetailProvider>

  )
}
interface UserTooltipCardProps {
  user: UserInfo
  open: boolean
}
const UserTooltipCard = ({ user, open }: UserTooltipCardProps): JSX.Element => {
  const { t } = useTranslation()
  const { createdProjects, fetchCreatedProjects, fetchCreatedProjectsStatus } = useUserDetailContext()
  const formattedCreatedAt = new Date(user.created_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  useEffect(() => {
    if (fetchCreatedProjectsStatus === 'idle' && open) {
      void (async () => {
        await fetchCreatedProjects(user._id)
      })()
    }
  }, [open])
  if (fetchCreatedProjectsStatus === 'idle' || fetchCreatedProjectsStatus === 'loading') {
    return (
        <div className='w-96 h-40 flex justify-center'>
            <LoadingButton loading/>
        </div>
    )
  }

  return (
    <>
        <div className='flex items-center py-1 bg-slate-50 hover:bg-slate-100'>
            <Link className='text-md font-semibold' href={`/users/${user._id}`}>
              <img src={user.photoUrl} className="m-2 w-20 h-20 rounded-full hover:cursor-pointer hover:border-solid hover:border-blue-300 hover:border-2"/>
            </Link>
            <div>
                <Link className='text-md font-semibold'
                 href={`/users/${user._id}`}>
                 <div className="font-bold text-base text-gray-600 hover:cursor-pointer ">{user.displayName}</div></Link>
                {user.location !== undefined && user.location.length !== 0 && (
                  <div className='flex items-center'>
                    <PlaceIcon className='w-3.5 h-3.5 mr-1 text-gray-500'/>
                    <div className="text-sm text-gray-600"> {user.location}</div>
                  </div>
                )}
                <div className="text-sm text-gray-600">{t('page.user_detail.joined')} {formattedCreatedAt}</div>
            </div>
        </div>
        { createdProjects.length !== 0 &&
        <>
          <Divider className='mb-4'/>
          <div className='w-full mb-4 grid grid-cols-3'>
              { createdProjects.slice(0, 3).map((project) => (
                  <div key={project._id}>
                    <Link prefetch = {false} href={`/projects/${project._id}`} passHref>
                      <img src = {project.coverURL}
                        className="md:w-28 md:h-28 flex-auto hover:cursor-pointer hover:opacity-50 w-20 h-20 object-cover"
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null // prevents looping
                          currentTarget.src = '/assets/Default-img.jpg'
                        }} />
                    </Link>
                  </div>
              )) }
          </div>
        </>
        }
    </>
  )
}
