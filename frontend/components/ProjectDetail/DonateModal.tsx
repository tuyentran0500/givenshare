import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import Button from '@mui/material/Button'

interface ProgressStatusProps {
  handleClose: Function
  handleDonate: Function
  open: boolean
}

const DonateModal: FC<ProgressStatusProps> = (props): JSX.Element => {
  const { t } = useTranslation()
  const [money, setMoney] = React.useState<number | undefined>(undefined)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value !== undefined) {
      setMoney(parseInt(event.target.value))
    } else {
      setMoney(undefined)
    }
  }

  const baseStyle = {
    '& fieldset': {
      borderWidth: '1px',
      '&:hover': {
        borderColor: 'red'
      }
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'pink',
        borderWidth: '1px'
      },
      '&:hover fieldset': {
        borderColor: 'pink',
        borderWidth: '1px'
      }
    }
  }

  return (
    <Modal
      open= {props.open}
      onClose={() => { props.handleClose(); setMoney(undefined) }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className='absolute w-96 p-4 left-2/4 top-2/4 bg-white rounded-lg translate-y-[-50%] translate-x-[-50%]'>

        {/* //TODO: Add input adornment */}
        {/* TODO: Only accept number and >= 0 */}
        <div className='flex justify-center mb-5'>
          <Image
            src="/img/logo-give.png"
            alt="Give&Share"
            height={75}
            width={150}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='text-lg font-semibold'>{t('page.projectDetail.donateModal.header')}</p>
          <p className='mb-5 text-sm text-center text-gray-600'>{t('page.projectDetail.donateModal.description')}</p>
        </div>
        <div className='flex items-center justify-center'>
          <TextField
          hiddenLabel
          // I can't find a way to make this autofocus, if someone knows how please do try
          autoFocus
          placeholder='1000'
          id="outlined-name"
          type="number"
          value={money ?? ''}
          onChange={handleChange}
          sx={ baseStyle }
          InputLabelProps={{
            style: { color: '#808080' }
          }}
          inputProps={{
            style: { padding: '13.5px 12px' }
          }}
          InputProps = {{
            startAdornment: '¥'
          }}
          />
         <Button className="ml-7 bg-red-50 hover:bg-red-100 w-12 h-12 text-red-400 rounded-lg" disabled={money === 0 || money === undefined} onClick={() => { props.handleDonate(money) }}>
            <FavoriteRoundedIcon style={{ fontSize: 30 }}/>
         </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DonateModal
