import React from 'react'
import { useTranslation } from 'react-i18next'
import { useUserDetailContext } from '../../contexts/UserDetail'
import { CustomCard } from '../Cards/CustomCard'

export const CreatedProjects = (): JSX.Element => {
  const { t } = useTranslation()
  const { createdProjects } = useUserDetailContext()
  if (createdProjects.length === 0) {
    return (
      <div>
        {t('page.user_detail.no_project')}
      </div>
    )
  }
  return (
    <div className='w-full grid md:grid-cols-2 sm:grid-cols-1'>
        { createdProjects.map((project, index) => (
            <div className="mb-4 mr-4" key={project._id}>
                <CustomCard project = {project} />
            </div>
        )) }
    </div>
  )
}

export default CreatedProjects
