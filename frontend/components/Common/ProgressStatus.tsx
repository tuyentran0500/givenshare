import { differenceInHours } from 'date-fns'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface ProgressStatusProps {
  pledged?: number
  totalPledged?: number
  numBackers?: number
  endDate?: Date
}

const ProgressStatus: FC<ProgressStatusProps> = ({
  pledged = 0,
  totalPledged = 0,
  numBackers = 0,
  endDate = ''
}
): JSX.Element => {
  const { t } = useTranslation()

  const hoursLeft = Math.max(0, differenceInHours(
    new Date(endDate),
    new Date()
  ))

  return (
    <div className='flex'>
        <div className='flex flex-col basis-2/4'>
            <div className='text-xl font-semibold text-green-700'>¥{pledged.toLocaleString()}</div>
            <div className='text-xs font-medium text-gray-500'>{t('components.progress.pledged')} ¥{totalPledged.toLocaleString()}</div>
        </div>
        <div className='basis-1/4'>
            <div className='text-lg font-semibold text-gray-600'>{numBackers}</div>
            <div className='text-xs font-medium text-gray-500'>{t('components.progress.backers')}</div>
        </div>
        <div className='basis-1/4'>
            <div className='text-lg font-semibold text-gray-600'>{hoursLeft}</div>
            <div className='text-xs font-medium text-gray-500'>{t('components.progress.hours')}</div>
        </div>
    </div>
  )
}

export default ProgressStatus
