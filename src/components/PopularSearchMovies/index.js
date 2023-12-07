import {Link} from 'react-router-dom'

import './index.css'

const MovieItem = props => {
  const {movie} = props
  const {id, posterPath, backdropPath, title} = movie

  return (
    <li className="popular-search-thumbnail" key={id}>
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="thumbnail-mobile-img" />
        <img src={backdropPath} alt={title} className="thumbnail-desktop-img" />
      </Link>
    </li>
  )
}

const PopularSearchMovies = props => {
  const {movies} = props
  return (
    <ul className="popular-search-movies">
      {movies.map(movie => (
        <MovieItem movie={movie} key={movie.id} />
      ))}
    </ul>
  )
}

export default PopularSearchMovies
