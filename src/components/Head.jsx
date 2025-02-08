import React from 'react'
import Navbar from './Navbar'

const Head = () => {
  return (
    <div className=' relative flex justify-center h-screen'>
        <Navbar/>
        <div className=' h-full w-full overflow-hidden'> {/*hero section*/}
            <img src="public/Image/HeroImage.jpg" alt="" className=' w-full' />
        </div>
    </div>
  )
}

export default Head