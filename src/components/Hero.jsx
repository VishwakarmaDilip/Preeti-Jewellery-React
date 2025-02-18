import React from 'react'
import Navbar from './Navbar'

const Hero = () => {
  return (
    <div className=' relative flex justify-center h-full xs:h-screen w-screen xs:w-full'>
        <Navbar/>
        <div className=' h-full w-full overflow-hidden'> {/*hero section*/}
            <img src="public/Image/HeroImage.jpg" alt="" loading='lazy' className=' w-full' />
        </div>
    </div>
  )
}

export default Hero;