import React, { FC } from 'react'
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined'

import { useTranslation } from 'react-i18next'

interface InformationBarProps {
  featured?: boolean
  category?: string[]
  location?: string
}

const InformationBar: FC<InformationBarProps> = ({
  featured = false,
  category = [],
  location = 'Undefined'
}): JSX.Element => {
  const { t } = useTranslation()

  return (
    <div className='flex border-y-2 py-3 gap-4 justify-evenly'>
        {featured && <div>
            <span className='pr-1'> <FavoriteBorderTwoToneIcon /> </span>
            <span className='text-sm'>{t('components.projects.project_we_love')}</span>
        </div>}
        <div>
            <span className='pr-1'> <ExploreOutlinedIcon /> </span>
            {/* How to get translation for categories */}
            <span className='text-sm'>{ category.join(', ') }</span>
        </div>
        <div>
            <span className='pr-1'> <RoomOutlinedIcon /> </span>
            {/* How to get translation for categories */}
            <span className='text-sm'>{ location }</span>
        </div>
    </div>
  )
}

export default InformationBar
