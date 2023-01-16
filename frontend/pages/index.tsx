import React, { useEffect } from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import { FeaturedProjects } from '../components/Homepage/FeatureProjects/FeaturedProjects'
import { FinalStretchProjects } from '../components/Homepage/FinalStretchProjects'
import { SoonToMissProjects } from '../components/Homepage/SoonToMissProjects'
import { ProjectsProvider, useProjectsContext } from '../contexts/Projects'

export const Home: React.FC<{}> = () => {
  return (
    <ProjectsProvider>
      <Homepage />
    </ProjectsProvider>
  )
}

const Homepage = (): JSX.Element => {
  const { t } = useTranslation()
  const {
    fetchFeatureProjects, fetchFinalStretchProjects, fetchSoonToMissProjects,
    fetchFeatureProjectsStatus, fetchFinalStretchProjectsStatus, fetchSoonToMissProjectsStatus
  } = useProjectsContext()

  useEffect(() => {
    void (async () => {
      if (fetchFeatureProjectsStatus === 'idle') {
        await fetchFeatureProjects()
      }
      if (fetchFinalStretchProjectsStatus === 'idle') {
        await fetchFinalStretchProjects()
      }
      if (fetchSoonToMissProjectsStatus === 'idle') {
        await fetchSoonToMissProjects()
      }
    })()
  }, [])

  return (
    <div className = "flex flex-col items-center p-6 md:p-16">
      {/* <Search /> */}
      <Head>
        <title>{t('pageTitle.homepage')}</title>
      </Head>
      <div className= "lg:w-[90%] max-w">
        <FeaturedProjects />
        <FinalStretchProjects />
        <SoonToMissProjects />
      </div>
      {/* <NewProjectSignup /> */}
    </div>
  )
}

export default Home
