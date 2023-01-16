import React from 'react'

import Signup from '../../components/Auth/Signup'
import Redirect from '../../components/Auth/RedirectWrapper'

const SignupPage = (): JSX.Element => {
  return (
  <Redirect loginRequired={false}>
    <div className='flex justify-center'>
      <Signup/>
    </div>
  </Redirect>
  )
}
export default SignupPage
