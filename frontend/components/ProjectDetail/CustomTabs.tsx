import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import Description from './Description'
import Comments from './Comments'

interface CustomTabsProps {
  description: string
  visualMedias: string[]
}

export const CustomTabs: FC<CustomTabsProps> = (props): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string): void => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example" textColor='inherit'
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#047808'
                }
              }}>
                  <Tab label={t('page.projectDetail.description')} value="1" />
                  <Tab disabled label={t('page.projectDetail.comment')} value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Description content={props.description} visualMedias={props.visualMedias}/>
            </TabPanel>
            <TabPanel value="2">
              <Comments />
            </TabPanel>
        </TabContext>
    </Box>
  )
}
