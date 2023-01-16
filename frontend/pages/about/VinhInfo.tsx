import React from 'react'
import { getUserDescription } from './AllMembers'

export const VinhInfo = (): JSX.Element => {
  const authorInfo = getUserDescription('Vinh')
  return (
    <ul className=" list-disc">
      {authorInfo.map((item, key) => (
      <li key={key}>
        {item}
        </li>))}
    </ul>
  )
}

export default VinhInfo
