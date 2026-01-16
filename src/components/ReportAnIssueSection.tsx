import React, { useState,useEffect,useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ProfileLeftSection from './ProfileLeftSection';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import Select from "react-select";
import {getAuth} from '../utils/storage';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface ReportIssueFeed {
    id:number;
    user: string;
    usertImage: string;
    reason: string;
    blockedDate: string;
}
const ReportAnIssueSection: React.FC = () => {
    const [loadingReportIssueFeed, setloadingReportIssueFeed] = useState<boolean>(true);
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [getReportIssueFeed, setReportIssueFeed] = useState<ReportIssueFeed[]>([]);
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginId(login);
            if (token) setToken(token);
    }, []);
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadReportIssueFeed = async () => {
            // setloadingBlockedUser(true);
            try {
            const response = await axios.post(`${BASE_URL}/common/reportanissue-feed`, {
                userid: userId,
                skip: 0,
                take: 20
            });

                // console.log("ReportIssueFeed Data:", response.data);

            if (response.data.status === "success") {
                setReportIssueFeed(response.data.data);
            }
            } catch (error) {
                // setloadingBlockedUser(false);
                console.error("Error loading profile:", error);
            }
        };

        loadReportIssueFeed();
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
                                        {
                                            getReportIssueFeed.length > 0 && (
                                                getReportIssueFeed.map((buser:any, index:number)=>(
                                                <tr key={index}>
                                                    <td>
                                                        <div className="profile-img">
                                                            <img
                                                                src={buser?.usertImage || '/assets/images/not-found.jpg'}
                                                                alt="locat not"  
                                                                    width={80}
                                                                style={{borderRadius:'50%'}}
                                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                    const target = e.currentTarget;
                                                                    target.onerror = null; // prevent infinite loop
                                                                    target.src = '/assets/images/not-found.jpg'; // fallback image
                                                                }}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{buser.user} </td>
                                                    <td>{buser.comment || "N\A"}</td>
                                                    <td> 
                                                        {buser.commentOn || "N\A"}
                                                    </td>
                                                    <td>{buser.reason || "Blocked"}</td>
                                                    <td> 
                                                        {new Date(buser.reportDate).toLocaleDateString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </td>
                                                </tr>
                                                ))
                                            )
                                        }
                                        
                                        
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
