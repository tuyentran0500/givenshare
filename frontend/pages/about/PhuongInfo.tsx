import React from 'react'
import { getUserDescription } from './AllMembers'

export const PhuongInfo = (): JSX.Element => {
  const authorInfo = getUserDescription('Phuong')
  return (
    <ul className="list-disc">
      {authorInfo.map((item, key) => (
      <li key={key}>
        {item}
      </li>))}
    </ul>
  )
}

export default PhuongInfo
