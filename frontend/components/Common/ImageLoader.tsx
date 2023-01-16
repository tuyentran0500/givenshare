import Link from 'next/link'
import React, { FC, useState } from 'react'

interface ImageLoaderProps {
  src: string
  className: string
  href?: string
}

const ImageLoader: FC<ImageLoaderProps> = ({ src, className, href }: ImageLoaderProps): JSX.Element => {
  const [isLoaded, setLoad] = useState(false)
  return (
    <>
      { href !== undefined
        ? <Link href={href ?? ''}>
          <img
            className={className}
            hidden={!isLoaded}
            src={src}
            onLoad={() => setLoad(true)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = '/assets/Default-img.jpg'
            }} />
      </Link>
        : <img
            className={className}
            hidden={!isLoaded}
            src={src}
            onLoad={() => setLoad(true)}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = '/assets/Default-img.jpg'
            }} />
    }
    <img
      hidden={isLoaded}
      className={className}
      src='/assets/Loading.gif'
      />
    </>

  )
}

export default ImageLoader
