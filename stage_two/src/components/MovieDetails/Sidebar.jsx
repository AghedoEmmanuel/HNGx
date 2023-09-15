
import { Link } from 'react-router-dom'
import home from '../../assets/Home.svg'
import movie from '../../assets/Movie Projector.svg'
import tv from '../../assets/TV Show.svg'
import upcoming from '../../assets/Calendar.svg'
import out from '../../assets/Logout.svg'
import logo from '../../assets/tv.png'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useState } from 'react'


const Sidebar = () => {

    return (
        <div className=' border-2 rounded-3xl border-grey-400 border-r-4 '>
            <div className={`md:space-y-11 rounded-lg md:p-4 space-y-20 flex flex-col items-start`}>

                <div className='pt-6 flex items-center '>
                    <img src={logo} alt="logo" className='' />
                    <h3 className='md:pl-4 font-bold md:text-2xl md:block hidden'>MovieBox</h3>
                </div>

                <div className='flex items-center px-4'>
                    <img src={home} alt='home' />
                    <Link to='/' className={`md:block hidden px-2`}> Home</Link>
                </div>
                <div className='flex px-4 items-center text-rose-500'>
                    <img src={movie} alt="movie" />
                    <Link to='/' className={`md:block hidden px-2`}> Movie</Link>
                </div>
                <div className='flex px-4 items-center'>
                    <img src={tv} alt="tv" />
                    <Link to='/' className={`md:block hidden px-2`}>TV Series</Link>
                </div>
                <div className='flex px-4 items-center'>
                    <img src={upcoming} alt="upcoming" />
                    <Link to='/' className={`md:block hidden px-2`}>Upcoming</Link>
                </div>
                <div className='px-2 md:border-2 md:rounded-3xl md:max-w-lg md:py-10 md:bg-rose-100 md:border-rose-200 md:block hidden'>
                    <div className='text-center md:py-10'>
                        <h5 className='font-medium'>Play movie quiz and earn free tickets</h5>
                        <p className='pb-6'>50k people are playing now</p>
                        <Link to='/' className='border-2 rounded-3xl py-2 px-4 bg-rose-400'>Start Playing</Link>
                    </div>
                </div>
                <div className='flex px-4 items-center md:pt-4'>
                    <img src={out} alt='log out' />
                    <Link to='/' className={`md:block hidden px-2`}> Log out</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar