import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Grow from '@mui/material/Grow'

import { passwordResetAPI } from '../../store/auth'
import ErrorSnackBar from '../../components/Common/ErrorSnackBar'
import SuccessSnackBar from '../../components/Common/SuccessSnackBar'

export const PasswordReset = (): JSX.Element => {
  const { handleSubmit, register, reset } = useForm()
  const { t } = useTranslation()
  const [error, seterror] = useState('')
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false)
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false)
  async function onPasswordReset (e: any): Promise<void> {
    const errorMessage = await passwordResetAPI(e.email)
    if (errorMessage != null) {
      seterror(errorMessage)
      setOpenErrorSnackBar(true)
    } else setOpenSuccessSnackBar(true)
    reset()
  }

  const handleSuccessSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccessSnackBar(false)
  }
  const handleErrorSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpenErrorSnackBar(false)
  }

  return (
    <div className='flex justify-center'>
      <Head>
        <title>{t('pageTitle.resetPW')}</title>
      </Head>
      <SuccessSnackBar open={openSuccessSnackBar} message={t('page.passwordreset.success_message')} onClose={handleSuccessSnackBarClose}/>
      <ErrorSnackBar open={openErrorSnackBar} message={error} onClose={handleErrorSnackBarClose} />
      <Grow
        in={true}
      >
        <form className='flex flex-col items-center w-96 mt-16' onSubmit={handleSubmit(onPasswordReset)}>
          <p className='text-center mt-8 mb-3 font-extrabold text-3xl text-gray-700'>{t('page.passwordreset.header')}</p>
          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-5 focus:border-sky-500 w-full">
            <AccountCircle className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('email')}
            id="input-with-sx" placeholder={t('components.auth.email')}/>
          </div>
          <Button type="submit" className='bg-blue-500 text-white hover:bg-blue-700 rounded-full px-3 py-2 mt-3'>{t('components.auth.submit')}</Button>
        </form>
      </Grow>
    </div>
  )
}
export default PasswordReset
