import ig from '../../assets/instagram.svg'
import fb from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import yt from '../../assets/youtube.svg'


const Footer = () => {
  return (
    <div className='space-y-6'>
    <div className='flex justify-center items-center md:space-x-12 sm:space-x-8' >
        <div>
            <a href="https://web.facebook.com/?_rdc=1&_rdr" target='_blank' className="hover:bg-blue-600"><img src={fb} alt='Facebook Page'/></a>
        </div>
        <div>
            <a href='https://www.instagram.com/?__coig_restricted=1' target='_blank'><img src={ig} alt='Instagram Page'/></a>
        </div>
        <div>
            <a href='' target='_blank'><img src={twitter} alt='Twitter Page'/></a>
        </div>
        <div>
            <a><img src={yt} alt='Youtube Page'/></a>
        </div>
    </div>
    <div className='flex justify-center items-center md:space-x-12 sm:space-x-8'>
        <a href='/'>Conditions of Use</a>
        <a href='/'>Privacy & Policy</a>
        <a href='/'>Press Room</a>
    </div>
    <div className='text-center'>
        <p>© 2023 MovieBox by Adriana Eka Prayudha  </p>
    </div>
    </div>
  )
}

export default Footer