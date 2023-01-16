import React from 'react'

import Login from '../../components/Auth/Login'
import Redirect from '../../components/Auth/RedirectWrapper'

const LoginPage = (): JSX.Element => {
  return (
  <Redirect loginRequired={false}>
    <div className="flex justify-center">
      <Login/>
    </div>
  </Redirect>
  )
}
export default LoginPage
