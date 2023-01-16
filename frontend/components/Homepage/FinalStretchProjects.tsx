import { Button } from '@mui/material'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useProjectsContext } from '../../contexts/Projects'

import { CustomCard } from '../Cards/CustomCard'

export const FinalStretchProjects = (): JSX.Element => {
  const { t } = useTranslation()
  const { finalStretchProjects, fetchFinalStretchProjects } = useProjectsContext()
  const seeMoreRef = useRef<HTMLInputElement>(null)
  const handleSeeMore = async (): Promise<void> => {
    await fetchFinalStretchProjects()
    seeMoreRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
        <div className="flex flex-col pt-32">
            <p className="place-self-start font-bold text-xl text-gray-600 mb-3">{t('components.projects.final_stretch_projects')}</p>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
              {
                finalStretchProjects.map(project => (
                  <CustomCard project = {project} key={project._id}/>
                ))
              }
            </div>
            <div ref = {seeMoreRef} className="flex justify-end mt-4">
              <Button className=" hover:bg-gray-300 text-black text-lg bg-transparent cursor-pointer normal-case rounded-lg" onClick={handleSeeMore}>
                {t('components.projects.see_more')}
              </Button>
            </div>
        </div>
  )
}
