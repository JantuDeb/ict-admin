import React from 'react'

const TableHead = ({title}) => {
  return (
    <th scope="col" className="px-6 py-3">
    {title}
  </th>
  )
}

export default TableHead