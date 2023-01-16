import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDropzone } from 'react-dropzone'
import Grow from '@mui/material/Grow'

import { postProject } from '../../api/project'
import { useAuthContext } from '../../contexts/Auth'

import CoverInput from '../../components/StartProject/CoverInput'
import VisualInput from '../../components/StartProject/VisualInput'
import { useRouter } from 'next/router'
import Tags from '../../components/StartProject/Tags'
import Redirect from '../../components/Auth/RedirectWrapper'
import { CircularProgress } from '@mui/material'

const MAX_MEDIAS_NUM = 4
const MAX_TITLE_LENGTH = 55
const MAX_SUBTITLE_LENGTH = 120

export const StartProject = (): JSX.Element => {
  const { t } = useTranslation()
  const { handleSubmit, register, control, setValue } = useForm()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [coverImage, setCoverImage] = useState<File | undefined>(undefined)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [title, setTitle] = useState<String>('')
  const [subtitle, setSubtitle] = useState<String>('')
  const [preview, setPreview] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { user } = useAuthContext()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (coverImage === undefined) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(coverImage)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [coverImage])

  const { getRootProps: getCoverProps, getInputProps: getCoverInputProps, isDragActive: isCoverDragActive } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (files) => {
      setCoverImage(files[0])
    }
  })

  const { getRootProps: getVisualProps, getInputProps: getVisualInputProps, isDragActive: isVisualDragActive } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (files) => {
      setSelectedFiles((prevFiles) => prevFiles.concat([...files]))
    }
  })

  const removeFile = (index: number, event: Event): void => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
    event.stopPropagation()
  }

  useEffect(() => {
    setValue('cover', coverImage)
  }, [coverImage])

  useEffect(() => {
    setValue('visualMedias', selectedFiles)
  }, [selectedFiles])

  // TODO: try to replace any by other specific type
  async function onSubmit (data: any): Promise<void> {
    const { title, subTitle, category, endDate, goal, description, cover, visualMedias } = data

    // Limit the number of upload files
    if (Array.from(visualMedias).length > MAX_MEDIAS_NUM) {
      alert(`Cannot upload more than ${MAX_MEDIAS_NUM} files`)
      return
    }
    setLoading(true)
    const projectPackage = new FormData()
    projectPackage.append('title', title)
    projectPackage.append('subTitle', subTitle)
    Array.from(category).forEach((current: any) => {
      projectPackage.append('category', current)
    })
    projectPackage.append('endDate', endDate ?? Date.now())
    projectPackage.append('goal', goal)
    projectPackage.append('description', description)
    projectPackage.append('cover', cover)
    projectPackage.append('author', JSON.stringify(user))
    Array.from(visualMedias).forEach((media: any) => {
      projectPackage.append('visualMedias', media) // add each visual media into sending package
    })

    const response = await postProject(projectPackage)
    // setPreview(undefined)
    // setSelectedFiles([])
    // reset()
    // alert('Successfully created new project:\n ' + JSON.stringify(response))
    if ((response?._id) != null) {
      void router.push(`/projects/${response._id}`)
    }
    setLoading(false)
  }

  const baseStyle = {
    '& label': { paddingLeft: (theme: any) => theme.spacing(2) },
    '& input': { paddingLeft: (theme: any) => theme.spacing(2) },
    '& fieldset': {
      paddingLeft: (theme: any) => theme.spacing(2.5),
      borderRadius: '0px',
      borderWidth: '1px',
      '&:hover': {
        borderColor: 'red'
      }
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'green',
        borderWidth: '1px'
      },
      '&:hover fieldset': {
        borderColor: 'green',
        borderWidth: '1px'
      }
    }
  }

  const DatePickerStyle = { ...baseStyle, '& .MuiOutlinedInput-input': { padding: '12.5px 14px' } }

  return (
    <Redirect loginRequired={true}>
      <div className="flex flex-col self-center items-center ">
        <Head>
          <title>{t('pageTitle.start')}</title>
        </Head>
        <div className='w-full flex justify-evenly'>
          <span className='flex-column justify-center items-center hidden xl:flex opacity-50'>
            <Image src={'/img/logo-tree.png'} height={400} width={300} alt='Tree'></Image>
          </span>
          <Grow
            in={true}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-gray-100 w-full h-fit xl:w-1/2  px-14 py-5 pb-16 leading-loose flex-column space-y-3 shadow-md hover:shadow-xl "
            >
              <section className=' flex justify-center '>
                <Image
                  src="/img/logo-share.png"
                  alt="Give&Share"
                  height={200}
                  width={200}
                />
              </section>
              <section>
                <TextField
                  required
                  id="standard-required"
                  variant="outlined"
                  label={t('components.projects.add_project.title')}
                  fullWidth
                  {...register('title')}
                  sx={ baseStyle }
                  InputLabelProps={{
                    style: { color: '#808080' }
                  }}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value)
                  }}
                  inputProps={{
                    maxLength: MAX_TITLE_LENGTH,
                    style: { padding: '12.5px 14px' }
                  }}
                  InputProps = {{
                    endAdornment: `${title.length}/${MAX_TITLE_LENGTH}`
                  }}
                />
              </section>
              <section>
                <TextField
                  required
                  id="standard-required"
                  variant="outlined"
                  label={t('components.projects.add_project.subtitle')}
                  fullWidth
                  multiline
                  {...register('subTitle')}
                  sx={ baseStyle }
                  value={ subtitle }
                  onChange={(event) => {
                    setSubtitle(event.target.value)
                  }}
                  InputLabelProps={{
                    style: { color: '#808080' }
                  }}
                  InputProps={{
                    style: { padding: '12.5px 14px' },
                    endAdornment: `${subtitle.length}/${MAX_SUBTITLE_LENGTH}`
                  }}
                  inputProps={{
                    maxLength: MAX_SUBTITLE_LENGTH
                  }}
                />
              </section>
              <section>
                <Tags
                  required = {true}
                  id="standard-required"
                  variant="outlined"
                  fullWidth
                  label={t('components.projects.add_project.category')}
                  control = { control }
                  setValue = { setValue }
                  sx = { baseStyle }
                  InputLabelProps={{
                    style: { color: '#808080' }
                  }}
                  inputProps={{
                    style: { padding: '12.5px 14px' }
                  }}
                />
              </section>

              <section>
                <TextField
                  required
                  id="standard-textarea"
                  variant="outlined"
                  label={t('components.projects.add_project.description')}
                  multiline
                  fullWidth
                  minRows={4}
                  sx={ baseStyle }
                  InputProps={{
                    style: { padding: '12.5px 14px' }
                  }}
                  InputLabelProps={{
                    style: { color: '#808080' }
                  }}
                  {...register('description')}
                />
              </section>
              <div className='flex justify-between'>
                <TextField
                  required
                  id="goal"
                  variant="outlined"
                  label={t('components.projects.add_project.goal')}
                  className="w-5/12"
                  type="number"
                  sx={ baseStyle }
                  InputLabelProps={{
                    style: { color: '#808080' }
                  }}
                  inputProps={{
                    style: { padding: '12.5px 14px' }
                  }}
                  InputProps = {{
                    startAdornment: '¥'
                  }}
                  {...register('goal')}
                />

                <Controller
                  control={control}
                  name="endDate"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          label={t('components.projects.add_project.end_date')}
                          onChange={onChange}
                          value={value} // TODO: Fix not to use current hours, minutes and seconds
                          className="w-5/12"
                          renderInput={(params) => <TextField {...params}
                          sx={ DatePickerStyle }
                          InputLabelProps={{
                            style: { color: '#808080' }
                          }}
                          />}
                        />
                      </LocalizationProvider>
                    )
                  }}
                  />
              </div>
              <CoverInput
                getRootProps = { getCoverProps }
                getInputProps={ getCoverInputProps }
                isDragActive={ isCoverDragActive }
                name={t('components.projects.add_project.cover_image')}
                preview = {preview}
              />
              <VisualInput
                getRootProps = { getVisualProps }
                getInputProps={ getVisualInputProps }
                isDragActive={ isVisualDragActive }
                handleDelete = { removeFile }
                multiple
                files={ selectedFiles }
                name={t('components.projects.add_project.visual_medias')}
              />
              <button className="rounded-none border-2 w-full h-12 my-4
                  bg-emerald-700 hover:bg-emerald-800 text-white text-2xl '" type="submit">
                    {isLoading ? <CircularProgress color="inherit" size={18} /> : <>{t('components.projects.add_project.create_project')}</>}
              </button>
            </form>
          </Grow>
          <span className='flex-column justify-center items-center hidden xl:flex opacity-50'>
            <Image src={'/img/logo-tree.png'} height={400} width={300} alt='Tree'></Image>
          </span>
        </div>

      </div>
    </Redirect>
  )
}

export default StartProject
