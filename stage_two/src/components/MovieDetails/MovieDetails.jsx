// MovieDetails.js
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Youtube from 'react-youtube';
import play from '../../assets/Play.svg';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import star from '../../assets/Star.svg'
import Loading from '../Loading/Loading';



const API_URL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_REACT_MOVIE_APP_API_KEY;

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [playTrailer, setPlayTrailer] = useState(true);
    const location = useLocation()
    const [isLoading, setIsLoading] = useState(true)

    const fetchMovie = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${API_URL}/movie/${id}`, {
                params: {
                    api_key,
                    append_to_response: 'videos,credits',
                },
            });
            const data = response.data;
            setMovie(data);
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching movie details:', error);
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const renderTrailer = () => {
        if (movie && movie.videos) {
            const trailer = movie.videos.results.find((vid) => vid.type === 'Trailer');
            return <div className='w-fit w-24rem'><Youtube videoId={trailer.key} /></div>;
        } else {
            return <p>No video format</p>;
        }
    };

    const formatDateToUTC = (dateString) => {
        const options = { timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' };
        const date = new Date(dateString).toUTCString(undefined, options);
        // const parts = date.split('/');
        //   return `${parts[2]}.${parts[0]}.${parts[1]}`;
        return date
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const time = hours+minutes
        return  `${time}m`;
    };

    const round = (number) => {
        if (number >= 1000) {
            const roundNumber = Math.round(number / 1000)
            return `${roundNumber}k`
        }
        return number.toString()
    }

    return (
        <div className=''>
            {location.pathname !== '/movie/:id' && (
                <div className='flex h-screen '>
                    <div className='md:block hidden'>
                        <Sidebar />
                    </div>
                    <div className="md:pt-14 md:px-44 space-y-2 flex-1 md:max-w-none max-w-xs">
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <div className=''>
                                {movie ? (
                                    <>
                                        <div>
                                            {movie.videos && playTrailer ? (
                                                renderTrailer()
                                            ) : null}
                                        </div>


                                        <div className='md:flex md:space-x-4 items-center'>
                                            <h1 className="font-bold" data-testid="movie-title">{movie.title} •</h1>
                                            <p data-testid='movie-release-date' className='font-bold'>{formatDateToUTC(movie.release_date)} •</p>
                                            <p className=" leading-loose " data-testid='movie-runtime'> {formatRuntime(movie.runtime)}</p>
                                            <p className="font-semibold leading-loose text-rose-400 ">{movie.genres?.map((genre) => genre.name).join(' , ')}</p>
                                            <p className='flex items-center '><img src={star} />{parseFloat(movie.vote_average).toFixed(1)}|{round(movie.vote_count)}</p>
                                        </div>

                                        <p className=" leading-loose" data-testid="movie-overview">
                                            {movie.overview ? (
                                                <p>{movie.overview}</p>
                                            ) : (
                                                <p>There is currently no information on this movie</p>
                                            )}
                                        </p>
                                        {/* <p className=" font-semibold leading-loose ">Writers: {movie.credits?.writing?.map((writer) => writer.name).join(', ')}</p>
                                <p className=" font-semibold leading-loose">Directors: {movie.credits?.direction?.map((director) => director.name).join(', ')}</p> */}
                                        <p className=" font-semibold leading-loose">Stars: {movie.credits?.cast?.slice(0, 5).map((star) => star.name).join(', ')}</p>
                                        <Link to='/' className=' md:hidden block pt-6 text-center font-bold text-rose-700'>Home</Link>

                                    </>
                                ) : (
                                    <p>No movie selected</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
