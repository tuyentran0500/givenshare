import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface StatisticsProps {
  numberOfFundedProjects: number
  totalMoney: number
  numberOfBackedProjects: number
}

export const Statistics: FC<StatisticsProps> = ({
  numberOfFundedProjects = 50,
  totalMoney = 1000000,
  numberOfBackedProjects = 15000
}): JSX.Element => {
  const { t } = useTranslation()
  return (
    <>
        <div className="mt-32 text-violet-500 text-lg font-bold mb-4">
            {t('page.statistic.title')}
        </div>
        <div className='w-5/6 min-h-[132px] bg-sky-100 flex space-x-0'>
          <div className="flex flex-col justify-center items-center basis-1/4 border-r-2">
              <span className="text-2xl font-bold">{numberOfFundedProjects.toLocaleString()}</span>
              <span className="text-lg">{t('page.statistic.funded_projects')}</span>
          </div>
          <div className="flex flex-col justify-center items-center basis-2/4">
              <span className="text-2xl font-bold">{totalMoney.toLocaleString()} JPY</span>
              <span className="text-lg">{t('page.statistic.goal')}</span>
          </div>
          <div className="flex flex-col justify-center items-center basis-1/4 border-l-2">
              <span className="text-2xl font-bold">{numberOfBackedProjects.toLocaleString()}</span>
              <span className="text-lg">{t('page.statistic.backed_projects')}</span>
          </div>
        </div>
    </>

  )
}
