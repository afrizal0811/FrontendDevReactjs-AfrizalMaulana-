import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AntdAvatar from '../components/avatar/AntdAvatar'
import AntdDivider from '../components/divider/AntdDivider'
import AntdImage from '../components/image/AntdImage'
import AntdRate from '../components/rate/AntdRate'
import { getApi } from '../utilities/handleApi'
import { isEmpty } from '../utilities/isEmpty'

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

  const renderData = (
    <div>
      <AntdImage
        src={data.image}
        width={400}
      />
      <h1>{data.name}</h1>
      <AntdRate number={data.rating} />
    </div>
  )

  const avatarReviewer = (
    <AntdImage
      src={reviewData.avatar}
      width={100}
    />
  )
  
  const renderReview = (
    <div>
      <AntdAvatar src={avatarReviewer} />

      <h4>{reviewData.name}</h4>
      <AntdRate number={data.rating} />
      <p>{reviewData.text}</p>
    </div>
  )
  return (
    <div>
      {isShowData && renderData}
      <AntdDivider text='Review' />
      {isShowReview && renderReview}
    </div>
  )
}

export default Detail