import React, { useEffect } from 'react'
import { Header } from '../Common/Header'
import { Footer } from '../Common/Footer'
import { useTranslation } from 'react-i18next'

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const { i18n } = useTranslation()
  // We need to use UseEffect here to allow nextjs recognize localStorage on its first render time: https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
  useEffect(() => {
    // Perform localStorage action
    const language = localStorage.getItem('language') ?? navigator.language
    void i18n.changeLanguage(language) // Change language
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="md:px-3 md:pb-32 md:pt-5 sm:p-0 mb-auto">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout
