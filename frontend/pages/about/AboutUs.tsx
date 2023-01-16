import React from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useTranslation } from 'react-i18next'
import { Fade } from '@mui/material'

export const AboutUs = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div>
      <Head>
        <title>{t('pageTitle.aboutUs')}</title>
      </Head>
      <h1 className="text-4xl font-semibold py-3">{t('page.about.header.aboutUs')}</h1>
      <Fade in={true} timeout={350} >
        <div>
          <p className=' lg:ml-10 mb-5 text-gray-500 whitespace-pre-wrap'>{t('page.about.content.aboutUs')}</p>
          <div className=' flex justify-center mb-10 '>
            <Image
                  src="https://givenshare.s3.us-east-1.amazonaws.com/public/uploads/projectsMedia/1673245445120_Loading.gif"
                  alt="Give&Share"
                  height={400}
                  width={450}
                  className="rounded-md "
            />
          </div>
        </div >

      </Fade>
    </div>
  )
}

export default AboutUs
