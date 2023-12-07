import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const CustomPrevArrow = props => {
  const {onClick} = props
  return (
    <div className="custom-arrow" onClick={onClick} role="button" tabIndex="0">
      <RiArrowLeftSLine color="#ffffff" size={24} />
    </div>
  )
}

const CustomNextArrow = props => {
  const {onClick} = props
  return (
    <div className="custom-arrow" onClick={onClick} role="button" tabIndex="0">
      <RiArrowRightSLine color="#ffffff" size={24} />
    </div>
  )
}
const MoviesSlider = props => {
  const {moviesList} = props

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  }

  return (
    <Slider {...settings} className="slider">
      {moviesList.map(movieDetails => {
        const {id, backdropPath, title} = movieDetails
        return (
          <li key={id} className="category-movie-item ">
            <Link to={`/movies/${id}`}>
              <img
                src={backdropPath}
                alt={title}
                className="category-movie-img"
              />
            </Link>
          </li>
        )
      })}
    </Slider>
  )
}

export default MoviesSlider
