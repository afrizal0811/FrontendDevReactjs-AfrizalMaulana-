import { LeftOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AntdAvatar from '../components/avatar/AntdAvatar'
import AntdButton from '../components/buttons/AntdButton'
import AntdCard from '../components/card/AntdCard'
import AntdDivider from '../components/divider/AntdDivider'
import AntdImage from '../components/image/AntdImage'
import AntdRate from '../components/rate/AntdRate'
import AntdSpin from '../components/spin/AntdSpin'
import { getApi } from '../utilities/handleApi'
import { isEmpty } from '../utilities/isEmpty'
import { multipleReview } from './help'

import './styles.css'

const Detail = () => {
  const { id } = useParams()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { review } = data

  useEffect(() => {
    const fetchData = async () => {
      const url = process.env.REACT_APP_API_URL
      setData(await getApi(`${url}/${id}`))
    }
    fetchData()
    setIsLoading(false)
  }, [id])

  const isShowData = !isEmpty(data) && !isLoading
  const isShowReview = isShowData && !isEmpty(review[0]) && !isLoading
  const reviewData = isShowReview && review[0]

  const renderLoading = <AntdSpin size='large' />

  const renderBackButton = (
    <Link to='/'>
      <AntdButton
        className='back-button'
        icon={<LeftOutlined />}
        shape='round'
        title='Back'
        type='primary'
      />
    </Link>
  )

  const renderData = (
    <div className='detail-container'>
      <div className='detail-content'>
        <AntdImage
          src={data.image}
          width={400}
        />
        <h1>{data.name}</h1>
        <AntdRate number={data.rating} />
      </div>
    </div>
  )

  const avatarReviewer = (
    <AntdImage
      src={reviewData.avatar}
      width={100}
    />
  )

  const renderReviewer = multipleReview(
    <AntdCard
      className='review-container'
      width={400}
    >
      <div className='review-content'>
        <AntdAvatar
          className='review-avatar'
          src={avatarReviewer}
        />
        <div>
          <h4>{reviewData.name}</h4>
          <AntdRate number={data.rating} />
        </div>
      </div>
      <p>{reviewData.text}</p>
    </AntdCard>
  )

  const renderDetail = (
    <div className='detail-container'>
      {renderBackButton}
      <div className='detail-content'>
        {renderData}
        <AntdDivider text='Review' />
        <div className='review'>{renderReviewer.map((data) => data)}</div>
      </div>
    </div>
  )

  return <div>{isShowData && isShowReview ? renderDetail : renderLoading}</div>
}

export default Detail
