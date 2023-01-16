import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuthContext } from '../../contexts/Auth'

import { Loading } from '../Common/Loading'

export const Redirect = ({ children, loginRequired }: { children: React.ReactNode, loginRequired: boolean }): JSX.Element => {
  const router = useRouter()
  const url = (loginRequired ? '/login' : '/')
  const { status } = useAuthContext()
  const redirectCondition = (loginRequired ? (status === 'notAuth') : (status === 'succeeded'))
  useEffect(() => {
    if (redirectCondition) {
      void (async () => {
        await router.push(url)
      })()
    }
  }, [status])
  if (status === 'idle' || status === 'loading') return <Loading/>
  return (
    <>
      {children}
    </>
  )
}
export default Redirect
