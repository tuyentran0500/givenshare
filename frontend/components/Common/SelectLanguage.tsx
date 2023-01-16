import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { useTranslation } from 'react-i18next'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundSize: '32px 32px',
        backgroundImage: 'url(\'/assets/english.png\')'
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    // backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '32px 32px',
      backgroundImage: 'url(\'/assets/japanese.png\')'
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2
  }
}))

const SelectLanguage = (): JSX.Element => {
  const { i18n } = useTranslation()
  const [checked, setChecked] = useState(false)

  // We need to use UseEffect here to allow nextjs recognize localStorage on its first render time: https://developer.school/snippets/react/localstorage-is-not-defined-nextjs
  useEffect(() => {
    const language = localStorage.getItem('language') ?? navigator.language
    setChecked(language === 'en')
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checkedLanguage = (event.target.checked ? 'en' : 'ja')
    localStorage.setItem('language', checkedLanguage)
    setChecked(event.target.checked)
    void i18n.changeLanguage(checkedLanguage) // Change language
  }

  return (
    <FormGroup className='hidden md:flex'>
        <FormControlLabel
        label=""
        control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={handleChange}
         /> }
        />
    </FormGroup>
  )
}
export default SelectLanguage
