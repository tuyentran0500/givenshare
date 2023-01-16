import React from 'react'
import { useTranslation } from 'react-i18next'

import { SearchBar } from './SearchBar'

export const Search = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <React.Fragment>
      <div className="lg:w-3/5 w-full mt-32">
        <h1 className="text-4xl mb-4">{t('page.search.title')}</h1>
        <p>{t('page.search.subtitle1')}</p>
        <p>{t('page.search.subtitle2')}</p>
        <SearchBar placeholder={t('page.search.placeholder')}/>
      </div>
    </React.Fragment>
  )
}

export default Search
