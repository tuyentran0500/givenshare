import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import { Slide } from '@mui/material'

import { UserInfoBar } from './UserInfoDropdown'
import { useAuthContext } from '../../contexts/Auth'
import { LoadingButton } from '@mui/lab'
import SelectLanguage from './SelectLanguage'
import Link from 'next/link'

export const Header = (): JSX.Element => {
  const router = useRouter()
  const { status } = useAuthContext()
  const { t } = useTranslation()

  return (
    <Slide in={true} direction='down' timeout={500} >
      <AppBar className="block bg-white px-3 md:px-20 py-1 shadow-lg shadow-black-500/75 sticky">
        <Container maxWidth={false}>
          <Toolbar className="md:px-10 flex justify-between ">
            <Box className="hidden lg:flex">
              <Link
                key="About us"
                href="/about"
              >
                <Button
                  className={router.pathname !== '/about' ? 'px-3 text-black block mx-3 tracking-wider border-none rounded-3xl hover:shadow-md transition-all outline-none hover:bg-green-300 hover:shadow-green-100 hover:translate-y-0.5 hover:text-white' : 'px-3 mx-3 bg-green-400 shadow-green-100 text-white tracking-wider border-none rounded-3xl'}
                >
                  {t('page.footer.about_us')}
                </Button>
              </Link>
              <div className="left-1/2 w-0.5 bg-gray-600"></div>
              <Link
                key="Start a New Project"
                href="/start"
              >
                <Button
                  className={router.pathname !== '/start' ? 'px-3 text-black  block mx-3 tracking-wider border-none rounded-3xl hover:shadow-md transition-all outline-none hover:bg-green-300 hover:shadow-green-100 hover:translate-y-0.5 hover:text-white' : 'px-3 mx-3 bg-green-400 shadow-green-100 text-white tracking-wider border-none rounded-3xl'}
                >
                  {t('page.navbar.new_project')}
                </Button>
              </Link>
            </Box>
            <Link href={'/'} passHref>
              <a>
                <Image
                  src="/img/logo-rec.png"
                  alt="Give&Share"
                  height={55}
                  width={190}
                  className="hover:cursor-pointer"
                >
                </Image>
              </a>
            </Link>

            <Box className="flex items-center">
              {status === 'succeeded' && <UserInfoBar />}
              {status === 'notAuth' && (
                <Link
                  key="Start a New Project"
                  href="/login"
                >
                  <Button
                    className={router.pathname !== '/login' ? ' h-fit px-3 text-black block mx-3 tracking-wider border-none rounded-3xl hover:shadow-md transition-all outline-none hover:bg-green-300 hover:shadow-green-100 hover:translate-y-0.5 hover:text-white' : 'h-fit px-3 mx-3 bg-green-400 shadow-green-100 text-white tracking-wider border-none rounded-3xl'}
                  >
                    {t('page.navbar.signin')}
                  </Button>
                </Link>
              )}
              {(status === 'loading' || status === 'idle') && <LoadingButton className="w-44" loading/>}
              <SelectLanguage/>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  )
}
