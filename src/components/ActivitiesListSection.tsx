import React, { useState,useEffect,useMemo } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import ProfileLeftSection from './ProfileLeftSection';
import DataStateLoading from '../utils/DataStateLoading';

import axios from 'axios';
import { Link } from 'react-router-dom';
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";
import { encodeId, generateSlug ,slugToTitle,usePageTitle} from '../utils/helpers';
import Select from "react-select";
import { getAuth } from '../utils/storage';
const BASE_URL = import.meta.env.VITE_API_URL;


interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const ActivitiesListSection: React.FC = () => {
    const [loadingActivity, setloadingActivity] = useState<boolean>(true);
    const [errorsActivity,setErrorsActivity] = useState('');
    const [getActivityData, setActivityData] = useState<string>('');
    const [userId, setUserId] = useState<string>("");
    useEffect(() => {
        const { userId} = getAuth();
            if (userId) setUserId(userId);
    }, []);
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadActivity = async () => {
            try {
            setloadingActivity(true);
            setErrorsActivity('');
            const response = await axios.post(`${BASE_URL}/user/activity-logs`, {
                userid: userId,
            });

                console.log("activity Data:", response.data);

            if (response.data.status === "success") {
                setActivityData(response.data.data);
            }
            } catch (error) {
                setErrorsActivity('Unable to fetch bookmark feed');
                console.error("Error loading profile:", error);
            }finally{
                setloadingActivity(false);
            }
        };

        loadActivity();
    }, [userId]);
    return (
        <main className="mainContent">
           <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                        <ProfileLeftSection/>
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                <DataStateLoading
                                    loading={loadingActivity}
                                    error={errorsActivity || null}
                                    isEmpty={!loadingActivity && getActivityData.length === 0}
                                    emptyText="NO Blocked Comment Feed found."
                                >
                                    {getActivityData && (
                                        <div 
                                            dangerouslySetInnerHTML={{ __html: getActivityData }}
                                        />
                                    )}
                                    {/* <ul className="activity-log">
                                        <li>
                                            <strong>Login</strong>
                                            <div>User logged in successfully</div>
                                            <small>27 Jan 2026 09:31 PM</small>
                                        </li>
                                    </ul> */}
                                </DataStateLoading>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
        </main> 
    );
};

export default ActivitiesListSection;
