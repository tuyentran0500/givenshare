import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { postDonateToProject } from '../../api/project'
import { Loading } from '../../components/Common/Loading'

export const DonateHandler = (): JSX.Element => {
  const router = useRouter()
  const { status, projectId, donatorId, amount } = router.query
  const isValidDonation = status === 'success' && projectId !== undefined && donatorId !== undefined && amount !== undefined

  useEffect(() => {
    if (isValidDonation) {
      void (async () => {
        const projectUrl = `/projects/${projectId as string}`
        const res = await postDonateToProject(projectId as string, donatorId as string, parseInt(amount as string))
        if (res != null) {
          await router.push(`${projectUrl}?succeeded=true`)
        }
      })()
    }
  }, [isValidDonation])

  return (
    <Loading></Loading>
  )
}
export default DonateHandler
