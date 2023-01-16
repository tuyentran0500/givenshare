import React from 'react'
import { getUserDescription } from './AllMembers'

export const TuyenInfo = (): JSX.Element => {
  const authorInfo = getUserDescription('Tuyen')
  return (
    <ul className=" list-disc">
       {authorInfo.map((item, key) => (
       <li key={key}>
        {item}
      </li>))}
    </ul>
  )
}

export default TuyenInfo
