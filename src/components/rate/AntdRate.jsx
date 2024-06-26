import { Rate } from 'antd'
import React from 'react'

const AntdRate = (props) => {
  const { number } = props
  return (
    <Rate
      defaultValue={number}
      disabled
      style={{ 'padding-top': '0.5rem' }}
    />
  )
}

export default AntdRate
