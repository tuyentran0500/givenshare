import React, { FC } from 'react'

import LinearProgress from '@mui/material/LinearProgress'

interface ProgressBarProps {
  current?: number
  goal?: number
}

const ProgressBar: FC<ProgressBarProps> = ({
  current = 0,
  goal = 0
}): JSX.Element => {
  const progress = Math.min(100, (current / goal) * 100)
  return (
        <LinearProgress className='w-full text-green-700 mb-1' color='inherit' variant='determinate' value={ progress } />
  )
}

export default ProgressBar
