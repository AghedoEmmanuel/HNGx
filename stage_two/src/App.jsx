
import { Card, Footer, MovieDetails } from "./components"
import { useState, useEffect } from 'react';
import axios from 'axios'
import logo from './assets/Logo.png'
import { IoMdMenu, IoMdClose, IoMdSearch } from 'react-icons/io'
import Youtube from 'react-youtube'
import play from './assets/Play.svg'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css'

const API_URL = "https://api.themoviedb.org/3"
const api_key = import.meta.env.VITE_REACT_MOVIE_APP_API_KEY
const IMG_URL = "https://image.tmdb.org/t/p/original"


function App() {
  const location = useLocation()
  // console.log(location)
  const [test, setTest] = useState([])
  const [navbar, setNavbar] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playTrailer, setPlayTrailer] = useState(false)


  const toggleNavbar = () => {
    setNavbar(!navbar)
  }



  const fetchData = async (searchKey) => {
    try {
      const type = searchKey ? "/search/movie" : "/movie/top_rated"
      const response = await axios.get(`${API_URL}${type}`, {
        params: {
          api_key,
          query: searchKey
        }
      })
      const { results } = response.data;
      const top = results.slice(0, 10)
      setTest(top)
      setSelectedMovie(top[0])
      // console.log(top)
    } catch (error) {
      alert('Error fetching ', error)
    }
  }

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key,
        append_to_response: 'videos'
      }
    })
    return data
  }

  const selectMovie = async (movie) => {
    const movies = await fetchMovie(movie.id)
    // console.log(movies)
    setSelectedMovie(movies)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderMovie = () => (
    test.map(movie => (
      <Card key={movie.id} movie={movie} data-testid='movie-card' selectMovie={selectMovie} />
    ))
  )


  const searchMovies = (e) => {
    e.preventDefault()
    fetchData(searchKey)
  }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.type === 'Trailer')
    return (
      <Youtube videoId={trailer.key} />
    )
  }



  return (
    // <Router className="">



    <div>
      {location.pathname === '/' && (

        <div className=" md:min-h-[650px] md:bg-top-center md:bg-cover sm:bg-auto sm:max-h-[90rem]" style={{ backgroundImage: `url('${IMG_URL}${selectedMovie.backdrop_path}')` }}>
          <navbar className={`flex flex-row justify-around items-center pt-2`}>
            <div>
              <img src={logo} alt="logo" />
            </div>

            <form onSubmit={searchMovies}>
              <div className={` ${navbar ? '' : 'hidden md:inline'}`}>
                <input type="text" placeholder="search...." value={searchKey} onChange={(e) => setSearchKey(e.target.value)} className='md:py-2 md:pr-20 md:pl-4 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300' />
                {/* <button onClick={toggleNavbar} className='bg-red-700 rounded-full'>
                  <IoMdSearch size={20} className="text-gray-400" />
                </button> */}
              </div>
            </form>
            <div className={`flex flex-row items-center`}>
              <a className="text-white mr-6">Sign in</a>
              <div >

                <button onClick={toggleNavbar} className='bg-red-700 rounded-full'>
                  {navbar ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
                </button>
              </div>
            </div>
          </navbar>


          <div>
            <div className="pt-14 md:px-44 space-y-2">
              {/* {selectedMovie.videos && playTrailer ? renderTrailer() : null} */}
              <h1 className="font-bold md:text-4xl max-w-xs text-amber-400" data-testid="movie-title">{selectedMovie.title}</h1>
              <p className="md:max-w-xs font-semibold leading-loose text-amber-400">{selectedMovie.overview ? <p>{selectedMovie.overview}</p> : <p>There is currently no information on this movie</p>}</p>
              <button className="flex items-center bg-red-700 p-2 rounded-lg px-8" onClick={() => setPlayTrailer(true)}><img src={play} />WATCH TRAILER</button>
            </div>
          </div>
        </div>


      )}
      <Routes>
        <Route path='/' element={<div className="md:grid md:grid-cols-4 md:gap-6 md:w-[90rem] mx-auto my-auto w-[20rem] py-9">{renderMovie()}</div>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      {location.pathname === '/' && (
        <div>
          <Footer />
        </div>
      )}
    </div>



    // </Router>
  )
}

export default App
