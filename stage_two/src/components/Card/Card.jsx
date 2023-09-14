
import imdb from '../../assets/imdb.svg'
import { Link } from 'react-router-dom';
import fav from '../../assets/Favorite.svg'

function Card({ movie, selectMovie }) {

  const formatDateToUTC = (dateString) => {
    const options = { timeZone: 'UTC', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

    return (
        <Link to={`/movie/${movie.id}`} >
        <div className="space-y-2" onClick={() => selectMovie(movie)}>
          <div className="w-[100%]" data-testid="movie-poster">
            {movie.poster_path ? (
              <div className='relative'>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="w-full "
                alt={movie.title}
              />
             <div className='absolute top-2 right-3 hover:bg-rose-500'>
             <img src={fav} alt='fav-icon' />
             </div>
              </div>
            ) : (
              <div className="min-h-[18rem] flex justify-center items-center border-solid border-2 border-black">
                No Image Found
              </div>
            )}
          </div>
          <p data-testid="movie-release-date">{formatDateToUTC(movie.release_date)}</p>
          <h3 className="font-bold" data-testid="movie-title">
            {movie.title}
          </h3>
          <p className="flex items-center">
            <img src={imdb} className="pr-2" alt="IMDb" />
            {movie.vote_average}/10
          </p>
          </div>
    </Link>

    )
}

export default Card