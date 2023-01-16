import { useTranslation } from 'react-i18next'
import React from 'react'

import { WebAuthorCard } from '../../components/Cards/WebAuthorCard'
import { VinhInfo } from './VinhInfo'
import { TuyenInfo } from './TuyenInfo'
import { PhuongInfo } from './PhuongInfo'
import { ShotaInfo } from './ShotaInfo'

export const getUserDescription = (name: string): string[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation()
  return t(`page.about.content.members.${name}`, {
    returnObjects: true
  })
}

export const AllMembers = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-4xl font-semibold ">{t('page.about.header.member')}</h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <WebAuthorCard
          authorName="Dang Khanh Vinh"
          role={t('page.about.role.developer')}
          studentId='1F10200001'
          fbURL="https://www.facebook.com/dankainvin/"
          linkedInURL="https://www.linkedin.com/in/vinh-dang-b3b239236/"
          profileImgURL="https://vocesabianime.com/wp-content/uploads/2022/06/Ao-que-Parece-Anya-ganhara-sua-primeira-versao-Adulta-Live-action.jpg"
        >
          <VinhInfo />
        </WebAuthorCard>
        <WebAuthorCard authorName="Tran Ba Tuyen"
          role={t('page.about.role.developer')}
          studentId='1F10200005'
          fbURL="https://www.facebook.com/WCTHV/"
          linkedInURL="https://www.linkedin.com/in/tuyentran0500/"
          profileImgURL="https://media.licdn.com/dms/image/C5603AQHntu8aUcmwHg/profile-displayphoto-shrink_800_800/0/1623673177897?e=1677715200&v=beta&t=cyIiFL7bxYI6RZD9Uh1SLXmovukK1fwzb6Ho-z53YzY"
        >
          <TuyenInfo />
        </WebAuthorCard>
        <WebAuthorCard
        authorName="Nguyen Duy Phuong"
        studentId='1F10200003'
        role={t('page.about.role.developer')}
        profileImgURL="https://i.ytimg.com/vi/Ux5cQbO_ybw/maxresdefault.jpg"
        linkedInURL="https://www.linkedin.com/in/ndphuong/"

        >
          <PhuongInfo />
        </WebAuthorCard>
        <WebAuthorCard
          authorName="藤井 翔大"
          role={t('page.about.role.designer')}
          studentId='1F10200359'
          fbURL="https://www.facebook.com/fujii.shota.90/"
          linkedInURL="https://www.linkedin.com/in/shota-fujii-715101243/">
          <ShotaInfo />
        </WebAuthorCard>
      </div>
    </div>
  )
}

export default AllMembers
