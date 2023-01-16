import React from 'react'

import { AboutUs } from './AboutUs'
import { AllMembers } from './AllMembers'

export const StartProject = (): JSX.Element => {
  return (
    <div className="flex flex-col p-5 pt-0 xl:p-40 xl:pt-0">
      <AboutUs />
      <AllMembers />
    </div>
  )
}

export default StartProject
