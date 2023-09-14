import logo from '../../assets/Logo.svg'
import { Link } from 'react-router-dom'
import home from '../../assets/Home.svg'
import movie from '../../assets/Movie Projector.svg'
import tv from '../../assets/TV Show.svg'
import upcoming from '../../assets/Calendar.svg'
import out from '../../assets/Logout.svg'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import { useState } from 'react'


const Sidebar = () => {
    const [open, setOpen] = useState(false)

    const clickHandler = () => {
        setOpen(!open)
    }
    return (
        <div className=' border-2 rounded-3xl border-grey-400 border-r-4'>
            <button className='md:hidden inline bg-red-700 rounded-full' onClick={clickHandler}>
                {open ? <IoMdClose size={20}/> :<IoMdMenu size={20}/>}
            </button>
            <div className={`space-y-11 rounded-lg p-6 ${open ? 'flex flex-col gap-4 flex-1':'hidden md:block'}`}>
                <button>
                    <div className='pt-6'>
                        <img src={logo} alt="logo" className='bg-black rounded-xl' />
                    </div>
                </button>
                <Link to='/' className='flex px-4 items-center'> <img src={home} alt='home' />Home</Link>
                <Link className='flex px-4 items-center'> <img src={movie} alt="movie" />Movie</Link>
                <Link className='flex px-4 items-center'><img src={tv} alt="tv" />TV Series</Link>
                <Link className='flex px-4 items-center'><img src={upcoming} alt="upcoming" />Upcoming</Link>
                <div className='md:px-4 md:border-2 md:rounded-3xl md:max-w-none md:py-10 md:bg-rose-100 md:border-rose-200 md:block hidden'>
                    <div className='text-center md:py-10'>
                        <h5 className='font-medium'>Play movie quiz and earn free tickets</h5>
                        <p className='pb-6'>50k people are playing now</p>
                        <Link className='border-2 rounded-3xl py-2 px-4 bg-rose-400'>Start Playing</Link>
                    </div>
                </div>
                <Link className='flex px-4 items-center pt-9'> <img src={out} alt='log out' />Log out</Link>
            </div>
        </div>
    )
}

export default Sidebar