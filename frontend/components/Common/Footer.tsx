import React from 'react'
import Image from 'next/image'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const SelectCurrency = (): JSX.Element => {
  const [currency, setCurrency] = React.useState('jpy')
  const { t } = useTranslation()
  const handleChange = (event: SelectChangeEvent): void => {
    setCurrency(event.target.value)
  }

  return (
    <Box className="mb-3 bg-white w-40">
      <FormControl fullWidth size="small" >
        <InputLabel id="demo-simple-select-label">{t('page.footer.currency.title')}</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          className='pl-3 '
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currency}
          label="Currency"
          onChange={handleChange}
        >
          <MenuItem value="jpy">{t('page.footer.currency.yen')}</MenuItem>
          <MenuItem disabled value="usd">{t('page.footer.currency.dollar')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export const Footer = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <footer className="text-center lg:text-left bg-gray-100 text-gray-600 shadow-xl shadow-black">
      <div className="flex justify-center items-center lg:justify-between p-6 border-b border-gray-300">
        <div className="mr-12 hidden lg:block">
          <span>{t('page.footer.connect')}</span>
        </div>
        <div className="flex justify-center">
          <a href="https://www.linkedin.com/in/vinh-dang-b3b239236/" className="text-gray-600">
            <LinkedInIcon />
          </a>
          <a href="https://www.linkedin.com/in/tuyentran0500/" className="text-gray-600">
            <LinkedInIcon />
          </a>
          <a href="https://www.linkedin.com/in/ndphuong/" className="text-gray-600">
            <LinkedInIcon />
          </a>
          <a href="https://www.linkedin.com/in/shota-fujii-715101243/" className="text-gray-600">
            <LinkedInIcon />
          </a>
        </div>
      </div>
      <div className="mx-6 py-10 text-center md:text-left lg:pl-80">
        <div className="grid grid-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <h6 className="uppercase font-semibold justify-center md:justify-start mb-4">
              {t('page.footer.about')}
            </h6>

            <Link href="/about" >
              <p className="text-gray-600 hover:font-semibold hover:cursor-pointer mb-4">
                {t('page.footer.about_us')}
              </p>
            </Link>

            <Link href="https://docs.google.com/forms/d/e/1FAIpQLSde7TSMkVoCaynj1tUsBsckSuTyzOltRyCx_wTQPzC-R0zz4g/viewform" >
              <p className="text-gray-600 hover:font-semibold hover:cursor-pointer">
               {t('page.footer.contact')}
              </p>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <h6 className="uppercase font-semibold mb-4">{t('page.footer.info')}</h6>
            <p className="mb-4">
              <a href="#!" className="text-gray-600 hover:font-semibold">
                {t('page.footer.privacy_policy')}
              </a>
            </p>
            <Image
              src="/pigture.png"
              alt="Pigture"
              height={64}
              width={100}
            />
          </div>
          <div className="mb-4 flex flex-col items-center">
            <h6 className="uppercase font-semibold mb-4 flex items-center justify-center md:justify-start ">
              {t('page.footer.toggle')}
            </h6>
            <SelectCurrency />
            <p>ver 0.1.4</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
