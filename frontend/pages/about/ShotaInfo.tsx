import React from 'react'
import { getUserDescription } from './AllMembers'

export const ShotaInfo = (): JSX.Element => {
  const authorInfo = getUserDescription('Shota')
  return (
    <ul className=" list-disc">
      {authorInfo.map((item, key) => (
      <li key={key}>
        {item}
      </li>))}
    </ul>
  )
}

export default ShotaInfo
