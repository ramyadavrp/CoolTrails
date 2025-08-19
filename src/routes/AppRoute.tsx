// src/routes/AppRoute.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import About from '../containers/About';
import Contact from '../containers/Contact';
import NotFound from '../containers/NotFound';
import Login from '../containers/auth/Login';

import Home from '../containers/Home';
import Affiliate from '../containers/Affiliate';
import Affiliate4Page from '../containers/AffiliateDetails';
import FrameTrail from '../containers/FrameTrail';
import ProfilePage from '../containers/ProfilePage';
import ProfileEdit from '../containers/ProfileEdit';
import Trail5Page from '../containers/Trail5Page';
import GiftPage from '../containers/GiftPage';
import CommunityPage from '../containers/CommunityPage';
import Page9 from '../containers/Page9';
import PrivateRoute from '../components/PrivateRoute';
import CreateMap from '../containers/CreateMap';
import Signup from '../containers/auth/Signup';
import ProfilePhotos from '../containers/ProfilePhotos';
import AffiliateDetails from '../containers/AffiliateDetails';
import ExploreTrail from '../containers/ExploreTrail';
import NationalParkGuide from '../containers/NationalParkGuide';
import GiftMembership from '../containers/GiftMembership';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFound />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/affiliates" element={<Affiliate />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="affiliate-details/Trail/:country/:state/:city/:title" element={<AffiliateDetails />} />

        {/* <Route path="/affiliate-details/:title" element={<AffiliateDetails />} /> */}
        <Route path="/explore-trail/Park/:country/:state/:city/:title" element={<ExploreTrail />} /> 
        <Route path="/explore-trail/" element={<ExploreTrail />} /> 
        <Route path="/national-park-guide" element={<NationalParkGuide />} /> 
        <Route path="/gift-membership" element={<GiftMembership />} /> 
        
        {/* <Route path="/affiliate-2" element={<Affiliate4Page />} /> 
        <Route path="/trail" element={<FrameTrail />} />  */}
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<ProfileEdit />} /> */}
        {/* <Route path="/trail-5-page" element={<Trail5Page />} />
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/community" element={<CommunityPage />} /> 
        <Route path="/page-9" element={<Page9 />} />
        <Route path="/create-map" element={<CreateMap />} /> */}

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<ProfileEdit />} />
          <Route path="/profile-photo" element={<ProfilePhotos />} />
          
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoute;
