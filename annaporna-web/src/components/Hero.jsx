import React from 'react'
import HeroImg from '../assets/hero.png';

const Hero = () => {
    return (
        < section className='relative pt-20 pb-32 overflow-hidden'>
            <div className='absolute inset-0 -z-20'>
                <img src={HeroImg} alt="Hero" className='w-full h-full object-cover opacity-100' />
            </div>
            <div className=''>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <h1 className='text-5xl font-bold lg:text-6xl text-gray-900 leading-tight drop-shadow-sm '>Share Food, <br /> Save Lives</h1>
                            <p className='mt-6 text-lg text-gray-800 max-w-3xl drop-shadow-sm opacity-0 '>Connect surplus food from restaurants and hostels to those in need.</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Hero