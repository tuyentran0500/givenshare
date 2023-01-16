import React from 'react'
import { AppProps } from 'next/app'

import '../styles/_carousel.scss'
import '../styles/globals.css'
import '../i18n/config'
import { AuthProvider } from '../contexts/Auth'
import Layout from '../components/Layout/default'

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default MyApp
