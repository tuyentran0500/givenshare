import React, { useRef } from 'react'
import ProgressBar from '../Common/ProgressBar'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { ProjectInfo } from '../../interfaces/ProjectInfo'
import { useTranslation } from 'react-i18next'
import { useInViewport } from 'react-in-viewport'
import { Zoom } from '@mui/material'
import { UserDetailTooltip } from '../UserDetail/UserDetailTooltip'
import { BackerAvatarGroup } from '../ProjectCard/BackerAvatarGroup'
import ImageLoader from '../Common/ImageLoader'
interface CustomCardProps {
  project: ProjectInfo
}
export const CustomCard = ({ project }: CustomCardProps): JSX.Element => {
  const myRef = useRef<HTMLElement>(null)
  const {
    enterCount
  } = useInViewport(myRef)
  const { t } = useTranslation()
  const { coverURL, title, author, subTitle, currentProgress, goal, backers, daysLeft } = project
  return (
  //  TODO: Change this to use tailwind
      <Zoom ref = {myRef} in={enterCount > 0} timeout={450}>
       <Card className='shadow-gray-400 shadow-md hover:shadow-emerald-300 hover:shadow-2xl' sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ImageLoader href={`/projects/${project._id}`} src={coverURL} className='flex-auto object-cover cursor-pointer h-[300px]' />
        <CardContent sx={{ '&:last-child': { pb: 0 } }}>           {/* Set CardContent bottom padding to 0, MUI sucks */}
          <Link href={`/projects/${project._id}`}>
            <Typography gutterBottom variant="h5" component="p" sx={{ cursor: 'pointer' }}>
              { title }
            </Typography>
          </Link>
          <div className='mb-1'>
            <a href = {`/users/${author._id}`} className="hover:cursor-pointer">
              <Typography gutterBottom variant="subtitle2" component="p" className='flex items-center'>
                By&nbsp;
                <UserDetailTooltip user = {author}>
                  <span className='font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600 hover:text-pink-700'>
                    {author.displayName}
                  </span>
                </UserDetailTooltip>
              </Typography>
            </a>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary" component="p">
              { subTitle }
            </Typography>
            <div className='flex flex-row-reverse items-center'>
              <BackerAvatarGroup backers = {backers}/>
            </div>
          </div>

          <div className="flex justify-between mt-1">
            <Typography gutterBottom variant="subtitle1">
              JPY { currentProgress }
            </Typography>
            <Typography gutterBottom variant="subtitle1">
              JPY { goal }
            </Typography>
          </div>
          <ProgressBar current={currentProgress} goal={goal} />
          <div className="flex justify-between">
            <Typography gutterBottom variant="caption" sx ={{ margin: 0 }}>
            {t('components.progress.backers')} { Object.keys(backers).length }
            </Typography>
            {
              daysLeft !== undefined &&
            <Typography gutterBottom variant="caption">
              { daysLeft } {t('components.progress.day')}
            </Typography>
            }
          </div>
        </CardContent>
      </Card>
    </Zoom>
  )
}
