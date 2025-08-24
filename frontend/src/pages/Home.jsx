import React from 'react'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import TrustedBrand from '../components/TrustedBrand'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Download from '../components/Download'

const Home = () => {
  return (
    <div className='overflow-hidden'>
        <Navbar />
        <Hero />
        <TrustedBrand />
        <Features />
        <Download />
        <Footer />
    </div>
  )
}

export default Home
