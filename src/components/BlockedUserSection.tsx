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

const BASE_URL = import.meta.env.VITE_API_URL;

interface Park{
    title:string,
    description:string

}

interface BlockedUser {
    id:number;
    user: string;
    usertImage: string;
    reason: string;
    blockedDate: string;
}
const BlockedUserSection: React.FC = () => {
    const [loadingBlockedUser, setloadingBlockedUser] = useState<boolean>(true);
    const [errorsBlockedUser,setErrorsBlockedUser] = useState('');
    const [loginId, setLoginId] = useState("");
    const [userId, setUserId] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const [getBlockedUser, setBlockedUser] = useState<BlockedUser[]>([]);
    useEffect(() => {
        const { userId, token ,login} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginId(login);
            if (token) setToken(token);
    }, []);
    
    useEffect(() => {
        if (!userId) return; // wait until userId is available

        const loadBlockedUser = async () => {
            try {
            setloadingBlockedUser(true);
            setErrorsBlockedUser('');
            const response = await axios.post(`${BASE_URL}/common/blockedfeedbyuser`, {
                userid: userId,
                skip: 0,
                take: 20
            });

                // console.log("Blocked Data:", response.data);

            if (response.data.status === "success") {
                setBlockedUser(response.data.data);
            }
            } catch (error) {
               setErrorsBlockedUser('Unable to fetch bookmark feed');
                console.error("Error loading profile:", error);
            }finally{
                setloadingBlockedUser(false);
            }
        };

        loadBlockedUser();
    }, [userId]);
    if (loadingBlockedUser) {
        return (
            <div
                style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "#FFF5E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
                }}
            >
                <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
            </div>
        );
    }
    if (errorsBlockedUser) return <p>{errorsBlockedUser}</p>;
        
    if (getBlockedUser.length === 0) return <p>NO Report found.</p>;
    return (
        <main className="mainContent">
           <section className="section-profile-feed inner-dashboard position-relative py-3">
                <div className="container">                    
                    <div className="row">
                         <ProfileLeftSection/>
                        <div className="col-xl-9 col-lg-7 col-md-7 col-sm-12 col-12">
                            <div className="profile-inner-card bg-almost-white br-20 profile-card-feed">
                                <div className="feed-table table-responsive">
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
                                            {
                                                getBlockedUser.length > 0 && (
                                                  getBlockedUser.map((buser:any, index:number)=>(
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
                                                        <td>{buser.reason || "Blocked"}</td>
                                                        <td> 
                                                            {new Date(buser.blockedDate).toLocaleDateString("en-IN", {
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

export default BlockedUserSection;
