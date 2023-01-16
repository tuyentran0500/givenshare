import React from 'react'
import { useTranslation } from 'react-i18next'

import { SearchBar } from '../Common/SearchBar'

export const NewProjectSignup = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div className="lg:w-3/5 w-full mt-10">
      <div className="place-self-center">
        <h1 className="text-4xl mb-4">{t('components.projects.new_project_signup.title')}</h1>
        <p className="text-lg">{t('components.projects.new_project_signup.subtitle')}</p>
      </div>
      <SearchBar placeholder={t('components.projects.new_project_signup.placeholder')}/>
    </div>
  )
}
