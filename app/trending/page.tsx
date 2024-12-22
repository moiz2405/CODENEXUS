import React from 'react'
import Trending from '../../components/Trending/Trending'
import TrendingCarousel from '../../components/Trending/TrendingCarousel'
function page() {
  return (
    <> 
    <div className='w-full px-4 py-8 mx-20'>
   <TrendingCarousel />
    <Trending />
    </div>
    </>
  )
}

export default page