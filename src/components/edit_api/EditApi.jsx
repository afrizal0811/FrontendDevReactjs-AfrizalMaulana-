import React from 'react'
import { putApi } from '../../utilities/handleApi'

const EditApi = () => {
  // const localePriceFormat = (price) => {
  //   return new Intl.NumberFormat('id', {
  //     style: 'currency',
  //     currency: 'IDR',
  //   }).format(price)
  // }
  
  const randomPut = (rand1, rand2, rand3, rand4) => {
    const isOpen = [false, true]
    const price = ['$', '$$', '$$$', '$$$$']
    const category = ['Indonesian', 'American', 'Chinese', 'Thai', 'Italian']
    const rating = [3, 4, 5]
    const values = {
      is_open: isOpen[rand1],
      price: price[rand2],
      category: category[rand3],
      rating: rating[rand4],
    }
    return values
  }

  const randomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  const url = process.env.REACT_APP_API_URL
  const handleSubmit = async () => {
    for (let i = 1; i <= 50; i++) {
      const value = randomPut(
        randomNumber(0, 1),
        randomNumber(0, 3),
        randomNumber(0, 4),
        randomNumber(0, 2),
      )
      await putApi(`${url}/${i}`, value)
    }
    alert('done!')
  }
  return <button onClick={handleSubmit}> PUT API </button>
}

export default EditApi
