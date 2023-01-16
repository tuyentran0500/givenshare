import React, { useEffect, useState } from 'react'
import ProgressBar from '../../Common/ProgressBar'
import { useTranslation } from 'react-i18next'
import { Fade } from '@mui/material'

import CustomCarousel from './CustomCarousel'
import ProgressStatus from '../../Common/ProgressStatus'
import UserCard from '../../Cards/UserCard'
import DefaultGreenButton from '../../Buttons/DefaultGreenButton'
import { useProjectsContext } from '../../../contexts/Projects'
import { ProjectInfo } from '../../../interfaces/ProjectInfo'
import { BackerAvatarGroup } from '../../ProjectCard/BackerAvatarGroup'
import { truncateString } from '../../Helpers/Helper'
import Link from 'next/link'

const MAX_SUBTITLE_LENGTH = 110

export const FeaturedProjects = (): JSX.Element | null => {
  const { t } = useTranslation()
  const [items, setItems] = useState<ProjectInfo[]>([])
  const [activeItem, setActiveitems] = useState<ProjectInfo | null>(null)
  const { featureProjects, fetchFeatureProjectsStatus } = useProjectsContext()
  const onItemChange = (activeIndex: number): void => {
    setActiveitems(items[activeIndex])
  }

  useEffect(() => {
    setItems([...featureProjects])
    setActiveitems(featureProjects[0])
  }, [fetchFeatureProjectsStatus])

  return (
    (activeItem != null)
      ? <div className="flex flex-col pt-1 ">
            <p className="place-self-start font-bold text-2xl text-gray-600 mb-3">{t('components.projects.feature-projects')}</p>
            <Fade in={true} timeout={350} >
              <div className='flex flex-col xl:flex-row  '>
                  <div className='basis-2/3'>
                      <CustomCarousel onItemChange={onItemChange} data={items}/>
                  </div>
                  <div className='flex flex-col justify-between xl:pl-10 basis-1/3 '>
                      <Link href = {`/projects/${activeItem._id}`}><h1 className='text-2xl font-semibold cursor-pointer'>{activeItem.title}</h1></Link>
                      <p className='mb-6'>{truncateString(activeItem.subTitle, MAX_SUBTITLE_LENGTH)}</p>
                      <ProgressBar current={activeItem.currentProgress} goal={activeItem.goal}/>
                      <ProgressStatus pledged={activeItem.currentProgress} totalPledged={activeItem.goal} endDate={activeItem.endDate} numBackers={Object.keys(activeItem?.backers).length}/>
                      <div className='mt-5 flex justify-center'>
                        <BackerAvatarGroup backers={activeItem.backers} maxCardNumber={3} cardSize={35}/>
                      </div>
                      {/* TODO: Fix Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef() */}
                      <div className='mt-auto'>
                        <div className='my-2'>
                          <DefaultGreenButton content={t('components.featured_projects.see_details')} href={`/projects/${activeItem._id}`} />
                        </div>
                        <UserCard user={activeItem.author}/>
                      </div>
                  </div>
              </div>
            </Fade>
        </div>
      : null
  )
}
