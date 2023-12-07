import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-title">Lost Your Way ?</h1>
    <p className="not-found-msg">
      {/* we are sorry the page you requested could not be found
      <br />
      Please go back to the homepage. */}
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-home-button">
        Go To Home
      </button>
    </Link>
  </div>
)

export default NotFound
