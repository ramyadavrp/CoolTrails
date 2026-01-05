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
import  DataStateLoading from '../utils/DataStateLoading';
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
const ReportAnIssueCommentSection: React.FC = () => {
    const [loadingReportIssueFeed, setloadingReportIssueFeed] = useState<boolean>(true);
    const [errorsReportIssueFeed,setErrorsReportIssueFeed] = useState('');
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
            try {
            setloadingReportIssueFeed(true);
            setErrorsReportIssueFeed('');
            const response = await axios.post(`${BASE_URL}/common/reportanissue-comment`, {
                userid: userId,
                skip: 0,
                take: 20
            });
            if (response.data.status === "success") {
                setReportIssueFeed(response.data.data);
            }
            } catch (error) {
                setErrorsReportIssueFeed('Unable to fetch bookmark feed');
                console.error("Error loading profile:", error);
            }finally{
                setloadingReportIssueFeed(false);
            }
        };

        loadReportIssueFeed();
    }, [userId]);
    ;
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
                                        loading={loadingReportIssueFeed}
                                        error={errorsReportIssueFeed || null}
                                        isEmpty={!loadingReportIssueFeed && getReportIssueFeed.length === 0}
                                        emptyText="NO Report found."
                                    >
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

export default ReportAnIssueCommentSection;
