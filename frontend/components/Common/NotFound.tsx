import React, { FC } from 'react'

const NotFound: FC = (): JSX.Element => {
  return (
      <div className='w-100 flex flex-col items-center justify-center'>
        <h1 className='text-5xl py-8'>Even Anya Can Not Find This Page :O</h1>
        <img className='w-1/4' src='/assets/NotFound.jpg'></img>
      </div>
  )
}

export default NotFound
