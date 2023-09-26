import React from 'react'

const CarouselImage = ({images}) => {
  return (
    <div>
      <img className='h-[500px] w-[900px]' src={images} />
    </div>
  )
}

export default CarouselImage