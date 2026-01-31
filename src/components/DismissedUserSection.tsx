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
import {getAuth} from '../utils/storage';
import DataStateLoading from '../utils/DataStateLoading';
const BASE_URL = import.meta.env.VITE_API_URL;


interface DismissedUser {
    id: number;
    message: string;
    userId: string;
    user: {
        id: string;
        userId: string;
        fullName: string;
        picturePath: string;
        address?: string | null;
    };
}

const DismissedUserSection: React.FC = () => {
    const [loadingDismissedUser, setloadingDismissedUser] = useState<boolean>(true);
    const [errorsDismissedUser,setErrorsDismissedUser] = useState('');
    const [getDismissedUser, setDismissedUser] = useState<DismissedUser[]>([]);
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginId(login);
            if (token) setToken(token);
    }, []);
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadDismissedUser = async () => {
            try {
            setloadingDismissedUser(true); // show loader every time fetch starts
            setErrorsDismissedUser("");
            const response = await axios.post(`${BASE_URL}/common/dismisseduser`, {
                userid: userId,
                skip: 0,
                take: 20
            });

                // console.log("dismisseduser Data:", response.data.data);

            if (response.data.status === "success") {
                setDismissedUser(response.data.data);
            }
            } catch (error) {
                setErrorsDismissedUser('Unable to fetch bookmark feed');
                console.error("Error loading profile:", error);
            }finally{
                setloadingDismissedUser(false);
            }
        };

        loadDismissedUser();
    }, [userId]);
   

    return (
        <main className="mainContent">
           <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                         <ProfileLeftSection/>
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                <div className="feed-table table-responsive">
                                    <DataStateLoading
                                        loading={loadingDismissedUser}
                                        error={errorsDismissedUser || null}
                                        isEmpty={!loadingDismissedUser && getDismissedUser.length === 0}
                                        emptyText="NO Dismissed User found."
                                    >
                                        <table className="table table-hover mb-0 br-20">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Image</th>
                                                    <th>User</th>
                                                    <th>Reason</th>
                                                    <th>Blocked Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getDismissedUser.length > 0 &&
                                                    getDismissedUser.map((buser: any, index: number) => (
                                                        <tr key={buser.id ?? index}>
                                                            <td>
                                                                <div className="profile-img">
                                                                    <img
                                                                        src={buser.user.picturePath || "/assets/images/not-found.jpg"}
                                                                        alt={buser.user.fullName}
                                                                        width={80}
                                                                        style={{borderRadius:'50%'}}
                                                                        onError={(e) => {
                                                                            e.currentTarget.src = "/assets/images/not-found.jpg";
                                                                        }}
                                                                    />
                                                                </div>
                                                            </td>

                                                            <td>{buser.user.fullName}</td>

                                                            <td>{buser.message || "Dismissed"}</td>

                                                            <td>{buser.addedOn}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </DataStateLoading>
                                </div>


                            </div>
                        </div>
                        
                    </div>
                </div>
           </section>
        </main> 
    );
};

export default DismissedUserSection;
