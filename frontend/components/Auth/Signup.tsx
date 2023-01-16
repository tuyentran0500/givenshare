import React, { useState } from 'react'
import Head from 'next/head'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import LockResetIcon from '@mui/icons-material/LockReset'
import { useTranslation } from 'react-i18next'
import { useAuthContext } from '../../contexts/Auth'
import { useRouter } from 'next/router'
import ErrorSnackBar from '../Common/ErrorSnackBar'
import Grow from '@mui/material/Grow'

interface FormValues {
  email: string
  password: string
  password2: string
}
const Signup = (): JSX.Element => {
  const { t } = useTranslation()
  const { handleSubmit, register } = useForm<FormValues>()
  const [error, seterror] = useState('')
  const { signUp } = useAuthContext()
  const router = useRouter()
  const onSignupWithEmailPassword = async (e: FormValues): Promise<void> => {
    if (e.password !== e.password2) {
      seterror('Password mismatch!!!')
      return
    }
    const errorMessage = await signUp(e.email, e.password)
    if (errorMessage instanceof Error) {
      seterror(errorMessage.message)
      return
    }
    await router.push('/')
  }
  const handleClosePopUp = (): void => {
    seterror('')
  }
  return (
    <>
      <Head>
        <title>{t('pageTitle.signup')}</title>
      </Head>
      <ErrorSnackBar open={error !== ''} onClose={handleClosePopUp} message={error} />
      <Grow
        in={true}
      >
        <form className='flex flex-col items-center w-96 mt-16' onSubmit={handleSubmit(onSignupWithEmailPassword)}>
          <p className='text-center mt-8 mb-3 font-extrabold text-3xl text-gray-700'>{t('page.signup.header')}</p>
          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-5 focus:border-sky-500 w-full">
            <AccountCircle className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('email')}
            id="email" autoComplete="off" placeholder={t('components.auth.email')}/>
          </div>

          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-1 w-full">
            <LockPersonIcon className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('password')} type="password"
            id="password" autoComplete="off" placeholder={t('components.auth.password')}/>
          </div>
          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-1 w-full">
            <LockResetIcon className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('password2')} type="password"
            id="password2" autoComplete="off" placeholder={t('components.auth.password2')}/>
          </div>
          <Button variant="contained" className="bg-blue-400 mt-4 hover:bg-blue-500 text-sm rounded-full w-52 mb-2" type="submit">{t('components.auth.signup')}</Button>
          <Button href="/login" className="bg-gray-200 w-52 hover:bg-gray-300 text-gray-400 hover:text-gray-700 rounded-full text-xs px-3 py-2 mt-3">
            {t('page.signup.login_message')}
          </Button>
        </form>
      </Grow>
    </>
  )
}
export default Signup
