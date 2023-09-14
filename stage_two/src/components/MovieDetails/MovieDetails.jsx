// MovieDetails.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Youtube from 'react-youtube';
import play from '../../assets/Play.svg';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import star from '../../assets/Star.svg'



const API_URL = "https://api.themoviedb.org/3";
const api_key = import.meta.env.VITE_REACT_MOVIE_APP_API_KEY;

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [playTrailer, setPlayTrailer] = useState(true);
    const location = useLocation()

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`${API_URL}/movie/${id}`, {
                params: {
                    api_key,
                    append_to_response: 'videos,credits',
                },
            });
            const data = response.data;
            setMovie(data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const renderTrailer = () => {
        if (movie && movie.videos) {
            const trailer = movie.videos.results.find((vid) => vid.type === 'Trailer');
            return <Youtube videoId={trailer.key} className='md:px-36'/>;
        } else {
            return <p>No video format</p>;
        }
    };

    const formatDateToUTC = (dateString) => {
        const options = { timeZone: 'UTC', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    return (
        <div className=''>
            {location.pathname !== '/movie/:id' && (
                <div className='flex h-screen '>
                    <div>
                        <Sidebar />
                    </div>
                    <div className="md:pt-14 md:px-44 space-y-2 flex-1 md:max-w-none max-w-xs">
                        {movie ? (
                            <div>
                                <div>
                                {movie.videos && playTrailer ? (
                                    renderTrailer()
                                ) : null}
                                </div>

                                <div className='md:flex md:space-x-2 md:items-center space-y-2'>
                                    <h1 className="font-bold" data-testid="movie-title">
                                        {movie.title} •
                                    </h1>
                                    <p data-testid='movie-release-date'>{formatDateToUTC(movie.release_date)} •</p>
                                    <p className=" leading-loose " data-testid= 'movie-runtime'> {formatRuntime(movie.runtime)}</p>
                                    <p className="font-semibold leading-loose text-rose-400 md:px-4">{movie.genres?.map((genre) => genre.name).join(' , ')}</p>
                                    <p className='flex items-center md:px-20'><img src={star} />{parseFloat(movie.vote_average).toFixed(1)}|{movie.vote_count}</p>
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

                            </div>
                        ) : (
                            <p>No movie selected</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
