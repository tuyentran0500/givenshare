import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { Fade } from '@mui/material'

import ProgressBar from '../../components/Common/ProgressBar'
import ProgressStatus from '../../components/Common/ProgressStatus'
import InformationBar from '../../components/Common/InformationBar'
import UserCard from '../../components/Cards/UserCard'
import DefaultGreenButton from '../../components/Buttons/DefaultGreenButton'
import NotFound from '../../components/Common/NotFound'
import DonateModal from '../../components/ProjectDetail/DonateModal'
import { CustomTabs } from '../../components/ProjectDetail/CustomTabs'
import ErrorSnackBar from '../../components/Common/ErrorSnackBar'
import SuccessSnackBar from '../../components/Common/SuccessSnackBar'
import { ProjectProvider, useProjectContext } from '../../contexts/Project'
import { Loading } from '../../components/Common/Loading'
import { useAuthContext } from '../../contexts/Auth'
import ImageLoader from '../../components/Common/ImageLoader'
import { BackerAvatarGroup } from '../../components/ProjectCard/BackerAvatarGroup'

export const Project: React.FC<{}> = () => {
  return (
    <ProjectProvider>
      <ProjectPage />
    </ProjectProvider>
  )
}

const ProjectPage: FC = (): JSX.Element => {
  const { t } = useTranslation()
  const { status: authStatus, user } = useAuthContext()
  const { query } = useRouter()
  const [open, setOpen] = React.useState<boolean>(false)
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = React.useState<boolean>(false)
  const [error, setError] = React.useState<Error>()
  const { project, donateToProject, fetchProjectById, fetchProjectInfoStatus } = useProjectContext()

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)
  const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccessSnackBar(false)
  }
  const handleDonate = async (amount: number): Promise<void> => {
    const result = await donateToProject(user._id, amount)
    // setCurrentProgress(oldAmount => oldAmount + amount)
    if (result instanceof Error) {
      setError(new Error(result.message))
    }
    handleClose()
  }

  useEffect(() => {
    if (query.succeeded === 'true') {
      setOpenSuccessSnackBar(true)
    }
  }, [query.succeeded])

  useEffect(() => {
    if (query.id !== undefined && fetchProjectInfoStatus !== 'errored') {
      void (async () => {
        await fetchProjectById(query.id as string)
      })()
    }
  }, [query.id])

  const isLoading = fetchProjectInfoStatus === 'loading' || fetchProjectInfoStatus === 'idle'

  const canViewProject =
    fetchProjectInfoStatus === 'succeeded' &&
    project != null

  return (
    <>
    {canViewProject
      ? (
      <Fade in={true} timeout={250} >
        <div className="w-full pt-5 md:px-20 lg:px-32 2xl:px-72">
          <Head>
            <title>{`${t('pageTitle.project')} | ${project.title}`}</title>
          </Head>
          <ErrorSnackBar onClose={() => { setError(undefined) }} open={error !== undefined} message={error?.message ?? 'Something wrong occured'} />
          <SuccessSnackBar open={openSuccessSnackBar} message="Thank you for your donation!" onClose={handleSnackBarClose}/>
          <div className="px-5 xl:grid xl:grid-rows-4 xl:grid-cols-5 xl:grid-flow-col 2xl:min-h-fit">
            {/* w-full max-h-full aspect-video is used to keep the image at 16:9 ratio */}
            {/* Set cover URL as static for now because relative path mess it up */}
            <ImageLoader className='min-w-0 w-full object-cover bg-gray-300 max-h-full aspect-video xl:order-2 xl:col-span-3 xl:row-span-3 xl:row-start-2 hover:shadow-green-100 hover:shadow-2xl'
              src={project.coverURL} />
            <div className='xl:order-1 xl:col-span-5 xl:text-center xl:row-start-1'>
                <h1 className='text-4xl text-green-700 font-semibold my-4'>{ project.title }</h1>
                <p className='mb-6 text-lg xl:order-2 xl:col-span-5 xl:text-center'>{ project.subTitle }</p>
                </div>
                <div className='xl:ml-8 xl:flex xl:flex-col xl:order-3 xl:col-start-4 xl:col-end-6 xl:row-start-2 xl:row-end-6'>
                    <div className='mb-4'>
                        <UserCard user={project.author}/>
                    </div>
                    <ProgressBar current={ project.currentProgress } goal={project.goal}/>
                    <div className='w-4/5 2xl:w-full mb-4'>
                        <ProgressStatus pledged={ project.currentProgress } totalPledged={ project.goal } numBackers={ Object.keys(project.backers).length } endDate={ project.endDate } />
                    </div>
                    <div className='min-w-max'>
                        {/* TODO: Add criteria for featured and recommended projects */}
                        <InformationBar category={project.category} location='Tokyo, JP' />
                    </div>
                    <div className='flex mt-4 justify-center'>
                      <BackerAvatarGroup backers = {project.backers} cardSize={40} maxCardNumber={4}/>
                    </div>
                    <div className=' mt-auto'>
                      <DefaultGreenButton onClick={handleOpen} content={t('components.projects.back_this_project')} authRequired={authStatus === 'notAuth'} />
                    </div>
                    <DonateModal open={open} handleClose={handleClose} handleDonate={handleDonate}/>
                </div>
          </div>
          <div className='border-t lg:ml-5 xl:mt-5'>
              <CustomTabs description={project.description} visualMedias={project.visualMedias}/>
          </div>
        </div>
      </Fade>)
      : isLoading ? (<Loading />) : (<NotFound />)}
    </>

  )
}

export default Project
