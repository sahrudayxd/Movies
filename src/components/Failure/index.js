import './index.css'

const Failure = props => {
  const {fetchMovies} = props

  return (
    <div className="failure-container">
      <img
        className="failure-img"
        src="https://res.cloudinary.com/dtkwvlezz/image/upload/f_auto,q_auto/v1/Netflix/failure"
        alt="failure view"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="failure-button" onClick={fetchMovies}>
        Try Again
      </button>
    </div>
  )
}

export default Failure
