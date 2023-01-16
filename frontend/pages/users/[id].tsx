import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import UserAvatar from '../../components/UserDetail/UserInfoCard'
import { useRouter } from 'next/router'
import { UserDetailProvider, useUserDetailContext } from '../../contexts/UserDetail'
import { Loading } from '../../components/Common/Loading'
import CreatedProjects from '../../components/UserDetail/CreatedProjects'
import BackedProjects from '../../components/UserDetail/BackedProjects'
import NotFound from '../../components/Common/NotFound'
import UserContentTab from '../../components/UserDetail/UserAboutTab'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../contexts/Auth'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel (props: TabPanelProps): JSX.Element {
  const { children, value, index, ...other } = props

  return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>{children}</div>
        )}
      </div>
  )
}
export const UserPage = (): JSX.Element => {
  return (
    <UserDetailProvider>
        <UserDetail/>
    </UserDetailProvider>
  )
}
export const UserDetail = (): JSX.Element => {
  const [value, setValue] = useState(0)
  const { query } = useRouter()
  const { user } = useUserDetailContext()
  const { user: authUser } = useAuthContext()
  const viewingUser = (user._id === authUser._id ? authUser : user)
  const { t } = useTranslation()
  const { fetchUserStatus, fetchCreatedProjectsStatus, fetchBackedProjectsStatus, fetchUserById, fetchCreatedProjects, fetchBackedProjects } = useUserDetailContext()
  const handleChange = (event: React.SyntheticEvent, newValue: number): void => {
    setValue(newValue)
  }

  useEffect(() => {
    if (query.id !== undefined) {
      setValue(0)
      void (async () => {
        await fetchUserById(query.id as string)
      })()
    }
    if (query.id !== undefined && fetchCreatedProjectsStatus === 'idle') {
      void (async () => {
        await fetchCreatedProjects(query.id as string)
      })()
    }
    if (query.id !== undefined && fetchBackedProjectsStatus === 'idle') {
      void (async () => {
        await fetchBackedProjects(query.id as string)
      })()
    }
  }, [query.id])

  const isLoading = fetchUserStatus === 'loading' || fetchUserStatus === 'idle' || fetchCreatedProjectsStatus === 'loading' || fetchCreatedProjectsStatus === 'idle' ||
                  fetchBackedProjectsStatus === 'loading' || fetchBackedProjectsStatus === 'idle'
  if (isLoading) {
    return <Loading></Loading>
  }
  if (fetchUserStatus === 'errored' || fetchCreatedProjectsStatus === 'errored' || fetchBackedProjectsStatus === 'errored') {
    return <NotFound/>
  }
  return (
    <>
      <Head>
        <title>{`${t('pageTitle.profile')} | ${viewingUser.displayName} `}</title>
      </Head>
        <UserAvatar user={viewingUser}/>
        <div className='flex flex-grow-1 justify-center'>
          <Tabs
              value={value}
              orientation="vertical"
              onChange={handleChange}
              className="w-40 mr:4 md:mr-24"
          >
              <Tab label={t('page.user_detail.about')} id="vertical-tab-1" aria-controls = "vertical-tabpanel-1" />
              <Tab label={t('page.user_detail.created')} id="vertical-tab-2" aria-controls = "vertical-tabpanel-2" />
              <Tab label={t('page.user_detail.backed')} id="vertical-tab-3" aria-controls = "vertical-tabpanel-3" />
          </Tabs>
          <div className="w-6/12">
              <TabPanel value={value} index={0}>
                <UserContentTab user = {viewingUser}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <CreatedProjects/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <BackedProjects/>
              </TabPanel>
          </div>
        </div>
    </>
  )
}
export default UserPage
