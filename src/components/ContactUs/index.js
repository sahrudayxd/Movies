import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const ContactUs = () => (
  <div className="contact-us-container">
    <ul className="contact-us-links">
      <li className="contact-us-item">
        <FaGoogle color="#ffffff" size={18} />
      </li>
      <li className="contact-us-item">
        <FaTwitter color="#ffffff" size={18} />
      </li>
      <li className="contact-us-item">
        <FaInstagram color="#ffffff" size={18} />
      </li>
      <li className="contact-us-item">
        <FaYoutube color="#ffffff" size={18} />
      </li>
    </ul>
    <p className="contact-us-text">Contact Us</p>
  </div>
)

export default ContactUs
