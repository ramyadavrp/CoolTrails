// src/routes/AppRoute.tsx
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import About from '../containers/About';
import Contact from '../containers/Contact';
import NotFound from '../containers/NotFound';
import Login from '../containers/auth/Login';

import Home from '../containers/Home';
import Affiliate from '../containers/Affiliate';
import Affiliate4Page from '../containers/AffiliateDetails';
import FrameTrail from '../containers/FrameTrail';
import ProfilePage from '../containers/ProfilePage';
import ProfilefeedPage from '../containers/ProfilefeedPage';
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
import Plan from '../containers/Plan';
import ParkDetails from '../containers/ParkDetails';
import GiftCustomize from '../containers/GiftCustomize';
import CommunityPageCmtDetails from '../containers/CommunityPageCmtDetails';
import CompleteTrailPage from '../containers/CompleteTrailPage';
import AddPost from '../containers/AddPost';
import ReportAnIssue from '../containers/ReportAnIssue';
import BlockedUser from '../containers/blockedUser';
import CommentOnFeed from '../containers/CommentOnFeed';
import DismissedUser from '../containers/DismissedUser';
import BookmarkTrail from '../containers/BookmarkTrail';
import Review from '../containers/Review';
import ActivitiesList from '../containers/ActivitiesList';
import Complete from '../containers/Complete';
import BookmarkFeed from '../containers/BookmarkFeed';
import BlockedComment from '../containers/BlockedComment';
import ReportAnIssueComment from '../containers/ReportAnIssueComment';
import FullTrailMapSection from '../components/FullTrailMapSection';
import ExploreNearByTrails from '../containers/ExploreNearByTrails';
import Forgot from '../containers/auth/Forgot';
import Reset from '../containers/auth/Reset';

const AppRoute = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="*" element={<NotFound />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<Forgot />} />
       
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/affiliates" element={<Affiliate />} />
        <Route path="/Trails/:country/:state?/:city?/:title" element={<AffiliateDetails />} />
        {/* <Route path="/:title" element={<AffiliateDetails />} /> */}
        <Route path="/Parks/:country/:state?/:city?/:title" element={<ExploreTrail />} /> {/* search and national park */}
        {/* <Route path="/explore/:title" element={<ExploreTrail />} />  */}
        {/* <Route path="/explore/" element={<ExploreTrail />} />  */}
        <Route path="/explore/" element={<ExploreNearByTrails />} />   {/* menu */}
        <Route path="/explore/:title" element={<ExploreNearByTrails />} />  {/* Home page category */}
        <Route path="/national-park-guide" element={<NationalParkGuide />} /> 
        <Route path="/gift-membership" element={<GiftMembership />} /> 
        <Route path="/plans" element={<Plan />} /> 
        <Route path="/guides/:country/:title" element={<AffiliateDetails />} /> 
        <Route path="/report-an-issue" element={<ReportAnIssue />} /> 
        <Route path="/report-an-issue-comment" element={<ReportAnIssueComment />} /> 
        <Route path="/blocked-user" element={<BlockedUser />} /> 
        <Route path="/blocked-comment" element={<BlockedComment />} /> 
        <Route path="/comment-on-feed" element={<CommentOnFeed />} /> 
        <Route path="/dismissed-user" element={<DismissedUser />} /> 
        <Route path="/bookmark-trail" element={<BookmarkTrail />} />
        <Route path="/bookmark-feed" element={<BookmarkFeed />} />
        <Route path="/review" element={<Review />} />
        <Route path="/activities" element={<ActivitiesList />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/trail-map" element={<FullTrailMapSection />} />
        {/* 30-1-26 add  */}
        <Route path="/community" element={<CommunityPage />} /> 
          
        
{/* <Route path="/guides/:country/:title" element={<ParkDetails />} />  15-12-25*/} 
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/gift/customize" element={<GiftCustomize />} />
        
        {/* <Route path="/affiliate-2" element={<Affiliate4Page />} /> 
        <Route path="/trail" element={<FrameTrail />} />  */}
        {/* <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<ProfileEdit />} /> */}
        {/* <Route path="/trail-5-page" element={<Trail5Page />} />
        <Route path="/gift" element={<GiftPage />} />
        <Route path="/community" element={<CommunityPage />} /> 
        <Route path="/page-9" element={<Page9 />} />*/}
        

        <Route element={<PrivateRoute />}>
          <Route path="/create-map" element={<CreateMap />} /> 
          <Route path="/profile" element={<ProfilePage />} />
           <Route path="/reset-password" element={<Reset />} />
          <Route path="/edit-profile" element={<ProfileEdit />} />
          {/* <Route path="/profile-feed" element={<ProfilePage />} /> */}
          <Route path="/profile-feed" element={<ProfilefeedPage />} />
          {/* <Route path="/complete-trail" element={<CompleteTrailPage />} /> */}
          <Route path="/profile-photo" element={<ProfilePhotos />} />
          {/* <Route path="/community" element={<CommunityPage />} /> */}
          <Route path="/explore/recording/:slug" element={<CommunityPageCmtDetails />} />
          <Route path="/add-post" element={<AddPost />} />
          
          
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoute;
