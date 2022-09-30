import { MuiThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactGa from "react-ga";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { UserProvider } from "./context/UserProvider";
import BehavioralCoaching from "./Pages/Behavioral-Coaching";
import FaangInterviews from "./Pages/FaangInterviews";
import Faq from "./Pages/Faq";
import Home from "./Pages/Home";
import InterviewSDE from "./Pages/InterviewSDE";
import InterviewSDM from "./Pages/InterviewSDM";
import InterviewTPM from "./Pages/InterviewTPM";
import AboutUs from "./Pages/About-Us";
import ContactUs from "./Pages/Contact-Us";
import SDMCore from "./Pages/SDMCore";
import SystemDesign from "./Pages/SystemDesign";
import Thankyou from "./Pages/Thankyou";
import TPMCore from "./Pages/TPMCore";
import { TrackDetails } from "./Pages/TrackDetails";
import theme from "./themes/primary";
import Faqs from "./Components/Disclaimer/Faqs";
import PrivacyPolicy from "./Components/Disclaimer/PrivacyPolicy";
import TermsConditions from "./Components/Disclaimer/Terms&Conditions";
import Mainfooter from "./Components/footer";
import { Tracks } from "./Pages/Tracks";
import Page404 from "./Pages/Page404";
import TracksUpdated from "./Pages/TracksUpdated";
import "react-alice-carousel/lib/alice-carousel.css";
import MockInterview from "./Pages/MockInterview";
import Jobs from "./Pages/Jobs";
import {Feedback} from "./Pages/Feedback";

// import HowItWorks from './Pages/HowItWorks';
function App() {
  const [focusForm, setFocusForm] = useState(false);
  const [email, setEmail] = useState(null);
  const [calendlyPrefillData, setCalendlyPrefillData] = useState(null);

  useEffect(() => {
    ReactGa.initialize("UA-152900192-1", "auto");
    //to report page view
    ReactGa.pageview(window.location.pathname);
  }, []);

  const setFocusOfUserForm = () => {
    setFocusForm(true);
  };

  const resetFocusOfUserForm = () => {
    setFocusForm(false);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <NavBar
            setFocusOfUserForm={setFocusOfUserForm}
            focusForm={focusForm}
            resetFocusForm={resetFocusOfUserForm}
            setEmail={(e) => setEmail(e)}
            email={email}
            calendlyPrefillData={calendlyPrefillData}
            setCalendlyPrefillData={setCalendlyPrefillData}
          />
          <Route
            path="/"
            render={({ location }) => {
              window.gtag("config", "UA-152900192-1", {
                page_path: location.pathname + location.search,
              });
            }}
          />
          <Switch>
            <Route
              path="/"
              render={() => (
                <Home
                  focusForm={focusForm}
                  resetFocusForm={resetFocusOfUserForm}
                  setEmail={(e) => setEmail(e)}
                  calendlyPrefillData={calendlyPrefillData}
                  setCalendlyPrefillData={setCalendlyPrefillData}
                />
              )}
              exact
            />
            {/* <Route path='/employer' component={HowItWorks} /> */}
            <Route path="/faq" component={Faq} />
            <Route path="/track-updated/:trackname" component={TracksUpdated} />
            <Route path="/about-us" component={AboutUs} />
            <Route
              path="/contact-us"
              render={() => (
                <ContactUs
                  focusForm={focusForm}
                  resetFocusForm={resetFocusOfUserForm}
                  setEmail={(e) => setEmail(e)}
                />
              )}
            />
            <Route path="/interview-sde" component={InterviewSDE} />
            <Route path="/interview-sdm" component={InterviewSDM} />
            <Route path="/interview-tpm" component={InterviewTPM} />
            <Route path="/behavioral-coaching" component={BehavioralCoaching} />
            <Route path="/system-design" component={SystemDesign} />
            <Route path="/sdm-core" component={SDMCore} />
            <Route path="/tpm-core" component={TPMCore} />
            <Route path="/faang-interviews" component={FaangInterviews} />
            <Route
              path="/thankyou"
              render={() => (
                <Thankyou email={email} resetEmail={() => setEmail(null)} />
              )}
            />
            <Route path="/track/:trackname" component={TrackDetails} />
            <Route path="/products" component={Tracks} />
            <Route path="/mock-interview" component={MockInterview} />
            <Route path="/faqs" component={Faqs} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/terms-and-condition" component={TermsConditions} />
            <Route path="/jobs" component={Jobs} />
            <Route path="/feedback" component={Feedback} />
            <Route component={Page404} /> {/**404 route */}
          </Switch>
          <Mainfooter />
        </Router>
      </UserProvider>
    </MuiThemeProvider>
  );
}

export default App;
