import {
  faFacebook, faLinkedin, faTwitter, faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';
import { Link } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <>
      <div className="footer">
        <div className='LinkSection'>
          <Link className="privacy social" to={`/about-us`}>About Us</Link>
          <Link className="privacy social" to={`/privacy-policy`}>Privacy Policy</Link>
          <Link className="privacy social" to={`/terms-and-condition`}>Term & Conditions</Link>
          <Link className="privacy social" to={`/faqs`}>FAQ</Link>
          <Link className="privacy social" to={`/contact-us`}>Contact Us</Link>
        </div>
        <div className="socialSec">
          <div>
            <h2>Follow Us</h2>
          </div>
        <div>
          <a target='_blank' rel="noopener noreferrer" href="https://www.facebook.com/interviewhelpio/" className="facebook social">
            <FontAwesomeIcon icon={faFacebook} size="3x" />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://twitter.com/techinterview2" className="twitter social">
            <FontAwesomeIcon icon={faTwitter} size="3x" />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://www.youtube.com/channel/UCmdo8WoDIwDM9BMhXs9sOrw" className="youtube social">
            <FontAwesomeIcon icon={faYoutube} size="3x" />
          </a>
          <a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/company/interviewhelp-io" className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="3x" />
          </a>
        </div>
        </div>
        <div className='AddressSection'>
          <div>
            <h2>Write us at:</h2>
          </div>
          <div>InterviewHelp Inc.</div>
          <div>8015 Douglas Ave SE,</div>
          <div>Snoqualmie,</div>
          <div>WA 98065,</div>
          <div>United States</div>
          <div>+1 425-298-3856</div>
        </div>
      </div>
      <div className='copyrightsection'>©InterviewHelp 2021</div>
      </>
    )
  }
}

export default App
