import React, { FC, MouseEventHandler } from 'react'
import Link from 'next/link'

interface ButtonProps {
  content: string
  href?: string
  onClick?: MouseEventHandler
  authRequired?: boolean
}

const DefaultGreenButton: FC<ButtonProps> = ({ content, href, onClick, authRequired }): JSX.Element => {
  if (authRequired === true) {
    return (
    <Link href='/login'>
        <a>
            <button className='rounded-none border-2 w-full h-12
            bg-emerald-700 hover:bg-emerald-800 text-white text-2xl  disabled:bg-emerald-400' onClick={onClick}>{content}</button>
        </a>
    </Link>
    )
  }
  if (href === undefined) {
    return (
      <button className='rounded-none border-2 w-full h-12
              bg-emerald-700 hover:bg-emerald-800 text-white text-2xl disabled:bg-emerald-400 ' onClick={onClick} >{content}</button>
    )
  }

  return (
    <Link href={href}>
        <a>
            <button className='rounded-none border-2 w-full h-12
            bg-emerald-700 hover:bg-emerald-800 text-white text-2xl  disabled:bg-emerald-400' onClick={onClick}>{content}</button>
        </a>
    </Link>
  )
}

export default DefaultGreenButton
