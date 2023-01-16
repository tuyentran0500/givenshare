import React, { useState } from 'react'
import Head from 'next/head'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookIcon from '@mui/icons-material/Facebook'
import AccountCircle from '@mui/icons-material/AccountCircle'
import LockPersonIcon from '@mui/icons-material/LockPerson'
import { loginWithEmailPasswordAPI, loginWithFacebookAPI } from '../../store/auth'
import { useAuthContext } from '../../contexts/Auth'
import { useRouter } from 'next/router'
import ErrorSnackBar from '../Common/ErrorSnackBar'
import Grow from '@mui/material/Grow'

interface FormValues {
  email: string
  password: string
}
const Login = (): JSX.Element => {
  const { t } = useTranslation()
  const { handleSubmit, register } = useForm<FormValues>()
  const [error, seterror] = useState('')
  const { logInWithGoogle } = useAuthContext()
  const router = useRouter()
  async function onLoginWithEmailPassword (data: FormValues): Promise<void> {
    const res = await loginWithEmailPasswordAPI(data.email, data.password)
    if (res instanceof Error) {
      seterror(res.message)
      return
    }
    await router.push('/')
  }
  async function onLoginWithGoogle (): Promise<void> {
    const errorMessage = await logInWithGoogle()
    if (errorMessage instanceof Error) {
      seterror(errorMessage.message)
    }
  }
  async function onLoginWithFacebook (): Promise<void> {
    const errorMessage = await loginWithFacebookAPI()
    if (errorMessage !== '') {
      seterror(errorMessage)
    }
  }

  const handleClosePopUp = (): void => {
    seterror('')
  }

  return (
    <>
      <Head>
        <title>{t('pageTitle.login')}</title>
      </Head>
      <ErrorSnackBar open={error !== ''} onClose={handleClosePopUp} message={error} />
      <Grow
        in={true}
      >
        <form className='flex flex-col items-center w-96 mt-16' onSubmit={handleSubmit(onLoginWithEmailPassword) }>
          <p className='text-center mt-8 mb-3 font-extrabold text-3xl text-gray-700'>{t('page.login.header')}</p>
          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-5 focus:border-sky-500 w-full">
            <AccountCircle className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('email')}
            id="email" autoComplete="off" placeholder={t('components.auth.email')}/>
          </div>

          <div className="flex bg-gray-100 rounded-full p-2 m-2 focus:outline-1 w-full">
            <LockPersonIcon className="text-gray-400 mr-1 my-1" />
            <input
            className='m-1 bg-gray-100 focus:outline-none w-full placeholder:font-semibold text-slate-400' {...register('password')}
            id="password" autoComplete="off" placeholder={t('components.auth.password')} type="password" />
          </div>
          <Button variant="contained" className="bg-blue-400 mt-4 hover:bg-blue-500 text-sm rounded-full w-52 mb-2" type="submit">{t('components.auth.login')}</Button>
          <div className='flex justify-center mb-3'>
              <Button onClick = { () => { void onLoginWithGoogle() }} variant="contained" className="bg-red-700 hover:bg-red-800 rounded-full text-sm mr-1" >
                <GoogleIcon />
              </Button>
              <Button onClick = { () => { void onLoginWithFacebook() }} variant="contained" className="bg-blue-700 hover:bg-blue-800 rounded-full text-sm">
                <FacebookIcon/>
              </Button>
          </div>
          <Button href="/signup" className="bg-gray-200 hover:bg-gray-300 text-gray-400 hover:text-gray-700 rounded-full w-fit text-xs px-3 py-2">
            {t('components.auth.signup')}
          </Button>
          <div className='text-center mt-2 rounded-full text-sm text-gray-500 hover:text-gray-800 hover:bg-gray-100 w-fit p-2'>
            <Link href='passwordreset'>
                {t('components.auth.forget_password')}
            </Link>
          </div>
        </form>
      </Grow>
    </>
  )
}
export default Login
