import React, { FC, useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { ProjectInfo } from '../../../interfaces/ProjectInfo'
import Link from 'next/link'

interface CustomCarouselProps {
  onItemChange: (activeIndex: number) => void
  data: ProjectInfo[]
}

export const CustomCarousel: FC<CustomCarouselProps> = (props): JSX.Element => {
  const [controlsAreVisible, setControlsAreVisible] = useState(true)
  useEffect(() => {
    // iPhone X width, for example
    if (window.innerWidth <= 400) {
      setControlsAreVisible(false)
    }
  }, [])

  return (
      <Carousel onSelect={props.onItemChange} interval={7000} controls={controlsAreVisible} className='hover:shadow-green-200 hover:shadow-2xl'>
        {props.data.map(item => (
          <Carousel.Item key={item._id}>
              <Link href={`/projects/${item._id}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                className="block w-full sm:h-[40vh] md:h-[60vh] object-cover bg-gray-300 hover:cursor-pointer"
                  src={item.coverURL}
                  alt="First slide"
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null // prevents looping
                    currentTarget.src = '/assets/Default-img.jpg'
                  }}
                />
              </Link>
              <Carousel.Caption className='w-full hidden md:block h-28 absolute bottom-0 left-0 bg-black bg-opacity-30 px-5'>
                <div >
                  <p className='font-semibold text-xl'>{item.title}</p>
                  <p className=' whitespace-nowrap overflow-hidden text-ellipsis'>{item.subTitle}</p>
                </div>
              </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Carousel>
  )
}

export default CustomCarousel
