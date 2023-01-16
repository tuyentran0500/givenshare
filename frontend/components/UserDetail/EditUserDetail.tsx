import React, { useEffect, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import { useFieldArray, useForm } from 'react-hook-form'
import { CircularProgress, DialogActions, IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'

import SuccessSnackBar from '../Common/SuccessSnackBar'
import ErrorSnackBar from '../Common/ErrorSnackBar'
import { AvatarInput } from './AvatarInput'
import { uploadUserAvatar } from '../../api/userAPI'
import { useAuthContext } from '../../contexts/Auth'
import { UserInfo } from '../../interfaces/UserInfo'
import LocationAutoComplete from './LocationAutoComplete'

const NAME_MAX_LENGTH = 12

export const EditUserDetail = (): JSX.Element => {
  const { t } = useTranslation()
  const { user, updateInfo } = useAuthContext()
  const [open, setOpen] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)
  const [avatarFile, setAvatarFile] = useState<File | undefined>()
  const [avatarPreview, setAvatarPreview] = useState('https://images4.alphacoders.com/118/thumb-1920-1187146.jpg')
  const [openSuccessSnackBar, setOpenSuccessSnackBar] = useState(false)
  const [openErrorSnackBar, setOpenErrorSnackBar] = useState(false)

  const { control, handleSubmit, register, reset, setValue } = useForm<UserInfo>({
    defaultValues: { ...user }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'website'
  })
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (files) => {
      setAvatarFile(files[0])
      const objectUrl = URL.createObjectURL(files[0])
      setAvatarPreview(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  })

  useEffect(() => {
    if (user !== null) {
      setAvatarPreview(user.photoUrl)
    }
  }, [user])

  const onSubmit = async (userData: Partial<UserInfo>): Promise<void> => {
    setLoading(true)
    if (avatarFile !== undefined) {
      const avatarData = new FormData()
      avatarData.append('avatar', avatarFile)
      const url = await uploadUserAvatar(avatarData)
      if (url != null) {
        userData = { ...userData, photoUrl: url }
      } else {
        setOpenErrorSnackBar(true)
        handleClose()
      }
    }
    const res = await updateInfo(userData)
    if (res) {
      setOpenSuccessSnackBar(true)
    } else setOpenErrorSnackBar(true)
    setLoading(false)
    handleClose()
  }
  const onCancel = (): void => {
    reset({ ...user })
    setAvatarPreview(user.photoUrl)
    setAvatarFile(undefined)
    handleClose()
  }
  const handleClickOpen = (): void => {
    setOpen(true)
  }
  const handleClose = (): void => {
    setOpen(false)
  }
  const handleSuccessSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSuccessSnackBar(false)
  }
  const handleErrorSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return
    }
    setOpenErrorSnackBar(false)
  }
  return (
    <div className='flex flex-col items-center mb-4 md:mb-0'>
        <Button className='p-4 rounded-full bg-sky-400 text-white font-semibold text-sm hover:bg-sky-700' onClick={handleClickOpen}>{t('page.user_detail.edit_profile')}</Button>
        <SuccessSnackBar open={openSuccessSnackBar} message={t('page.user_detail.update_success')} onClose={handleSuccessSnackBarClose}/>
        <ErrorSnackBar open={openErrorSnackBar} message={t('page.user_detail.update_error')} onClose={handleErrorSnackBarClose} />
        <Dialog
            open = {open}
            onClose = {onCancel}
            disableScrollLock={ true }
            maxWidth = {false}
        >
          <DialogTitle>{t('page.user_detail.edit_your_profile')}</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent className="w-[30vw] min-w-[400px]">
              <div className="flex justify-center">
                <AvatarInput preview={avatarPreview} getInputProps={getInputProps} getRootProps={getRootProps} />
              </div>
              <Box className="flex flex-col">
                  <CardContent className=" p-3">
                      <TextField inputProps={{ maxLength: NAME_MAX_LENGTH }} required fullWidth label={t('page.user_detail.name')} margin="dense" variant="standard" defaultValue={user.displayName} {...register('displayName')}/>
                      <TextField fullWidth label={t('page.user_detail.phone')} margin="dense" variant="standard" defaultValue={user.phone} {...register('phone')}/>
                      <LocationAutoComplete control = { control } setValue = { setValue } label={t('page.user_detail.location')} defaultValue={user.location ?? 'No data'}/>
                      <TextField fullWidth label={t('page.user_detail.biography')} margin="dense" multiline rows={4}
                      variant="standard" defaultValue={user.biography} {...register('biography')}/>
                      <div className='mt-2 text-gray-600 text-lg font-semibold'>{t('page.user_detail.websites')}</div>
                      <div className='flex flex-col'>
                        {fields.map((field, index) => (
                          <div className="ml-2 flex items-end w-96" key = {index}>
                            <TextField fullWidth label={t('page.user_detail.website')} margin="dense" defaultValue={field} variant="standard" required {...register(`website.${index}.value`)} />
                            <IconButton onClick = {() => remove(index)} className='flex items-end justify-center h-fit'><DeleteIcon/></IconButton>
                          </div>
                        ))}
                      </div>
                      <Button className="mt-4" onClick={() => append({ value: '' })}><AddIcon/>{t('page.user_detail.add_website')}</Button>
                  </CardContent>
              </Box>
          </DialogContent>
          <DialogActions>
              <Button className='m-1 rounded-full bg-white text-black border-2 hover:bg-slate-500 hover:text-white' onClick={onCancel}>{t('page.user_detail.cancel')}</Button>
              {!isLoading && <Button type="submit" className='m-1 rounded-full bg-sky-400 text-white hover:bg-sky-700'>{t('page.user_detail.save')}</Button>}
              {isLoading && <Button className='m-1 rounded-full bg-sky-400 text-white hover:bg-sky-400 p-2'><CircularProgress color="inherit" size={18} /></Button>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}
