import React, { useState,useEffect,useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ProfileLeftSection from './ProfileLeftSection';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug ,slugToTitle,usePageTitle} from '../utils/helpers';
import Select from "react-select";

const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const ReportAnIssueSection: React.FC = () => {
    const [nationalParks,setNationalParks] = useState([]);
    const[getPark,setPrak] = useState<Park[]>([]);
    const [loadingNParks,setLoadingNParks] = useState(true);
    const [errorsNParks,setErrorsNParks] = useState('');
    const [country, setCountry] = useState("india");
    const [Loading, setLoading] = useState(false);
    // Add more button
    const [expandedPosts, setExpandedPosts] = useState<{ [key: number]: boolean }>({});
    const [userId, setUserId] = useState<string>("");
    const [profile, setProfile] = useState<Profile | null>(null);
    usePageTitle("Cooltrails | National Park Guides");
    // Function to determine if a link is active
    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };
    
    const toggleExpand = (index: number) => {
        setExpandedPosts(prev => ({
        ...prev,
        [index]: !prev[index],
        }));
    };
    useEffect(() => {
            const storedId = sessionStorage.getItem("id");
            // const storedId = localStorage.getItem("id");
            console.log("Stored sssID:", storedId); // should print the ID string
            if (storedId) {
                // setUserId(storedId); 
                setUserId(storedId.trim());
            }  
    }, []);

    const limit = 150;

    // Show the profile
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadProfile = async () => {
            try {
            const response = await axios.post(`${BASE_URL}/user/profile`, {
                UserId: userId,
            }
            // {
            //     headers: {
            //     "Content-Type": "application/json",
            //     "Authorization": `Bearer ${sessionStorage.getItem("token")}`
            //     }
            // }
            );

            console.log("Profile Data:", response.data);

            if (response.data.status === "success") {
                const data = response.data.data;
                setProfile(data);
            }
            } catch (error) {
            console.error("Error loading profile:", error);
            alert("Failed to load profile");
            }
        };

        loadProfile();
}, [userId]);

    return (
        <main className="mainContent">
           <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                        <ProfileLeftSection/>
                    {/* <div className="col-xl-3 col-lg-5 col-md-5 col-sm-12 col-12">
                        <aside className="profile-sidebar sticky-top"> 
                            <div className="profile-sidebar-top  bg-almost-white">
                                <div className="sidebar-profile">
                                    <div className="profile-img">
                                        <img
                                            src={profile?.picturePath || '/assets/images/not-found.jpg'}
                                            alt="locat not"  
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                const target = e.currentTarget;
                                                target.onerror = null; // prevent infinite loop
                                                target.src = '/assets/images/not-found.jpg'; // fallback image
                                            }}
                                        />
                                    </div>
                                    <h4 className="profile-username text-midnight-navy">{profile?.fullName ?? ''}</h4>
                                    <h5 className="profile-address text-midnight-navy">{profile?.address ?? ''}</h5>
                                    <p className="membership-info text-grey">Member {profile?.registeredOn ?? ''}</p>
                                    
                                </div> 
                                 <div className="followings d-flex justify-content-between position-relative">
                                    <div className="follower">
                                        <h6 className="fl-count text-midnight-navy mb-0">{profile?.totalFollowers ?? ''}</h6>
                                        <p className="text-grey mb-0">Followers</p>
                                    </div>
                                    <div className="following">
                                         <h6 className="fl-count text-midnight-navy mb-0">{profile?.totalFollowing ?? ''}</h6>
                                        <p className="text-grey mb-0">Following</p>
                                    </div>
                                </div>
                            </div>  
                                <div className="profile-sidebar-menu  bg-almost-white">
                                    <ul className="list-unstyled profile-menu">
                                        <li className={isActive('/community')}><Link to={'/community'} >Feed</Link></li>
                                        <li className={isActive('/profile-photo')}><Link to={'/profile-photo'}>Photos</Link></li>
                                        <li className={isActive('/report-an-issue')}><Link to={'/report-an-issue'}>Reported an issue</Link></li>
                                       
                                    </ul>
                                </div>                       
                        </aside>
                    </div> */}
                    <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                        <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                            <div className="feed-table table-responsive">
                                <table className="table table-hover mb-0 br-20">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Image</th>
                                            <th>User</th>
                                            <th>Comment</th>
                                            <th>Comment On</th>
                                            <th>Reason</th>
                                            <th>Report Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                        <tr>
                                            <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                            <td>User 1</td>
                                            <td>test Cmt</td>
                                            <td>1 Oct,2025</td>
                                            <td>text report</td>
                                            <td>10 Oct,2025</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>
                </div>
           </section>
        </main>
        
  );
};

export default ReportAnIssueSection;
