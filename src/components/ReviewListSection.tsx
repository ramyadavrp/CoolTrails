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

interface Park{
    title:string,
    description:string

}
interface Review {
  userName: string;
  userId: string;
  title: string;
  descriptions: string;
}
interface Profile {
  fullName: string;
  address: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}
const ReviewListSection: React.FC = () => {
    const [userId, setUserId] = useState<string>("");
    const [loginIdBased, setLoginIdBased] = useState("");
    const [reviewDetails, setReviewdetails] = useState<Review[]>([]);
    const [loadingReview,setLoadingReview] = useState(true);
    const [errorsReview,setErrorsReview] = useState('');

    useEffect(() => {
        const { userId, token ,login,email} = getAuth();
            if (userId) setUserId(userId);
            if (login) setLoginIdBased(login);
    }, []);
    //  List review by userid based

    
    const loadReviewPost = async () => {
        if (!userId) return; // wait until userId is available
        try {
        setLoadingReview(true); // show loader every time fetch starts
        setErrorsReview("");
        const response = await axios.post(`${BASE_URL}/feed/user/Review/${userId}`, {
            LoginId: loginIdBased,
        });

        console.log("REvi sssss:", response.data);
            if (response.data.status === "success") {
                const data = response.data.data;
                setReviewdetails(data); //reviewDetails
            }
        }catch(err){
                // console.error('API Error:', err);
                setErrorsReview('Unable to fetch National Parks');
        } finally{
            setLoadingReview(false);
        }
    };
    useEffect(() => {
            loadReviewPost();
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
                                        loading={loadingReview}
                                        error={errorsReview || null}
                                        isEmpty={!loadingReview && reviewDetails.length === 0}
                                        emptyText="NO Review found."
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
                                                {
                                                    loadingReview ?(
                                                        <tr>
                                                            <td colSpan={4} className="text-center py-4">
                                                                <div
                                                                    style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#FFF5E9",
                                                                    display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999,
                                                                    }} >
                                                                    <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
                                                                </div>
                                                                {/* <div
                                                                    className="d-flex align-items-center justify-content-center"
                                                                    style={{ position: "absolute",inset: 0, background: "#FFF5E9", zIndex: 10, top:0, }}>
                                                                    <SyncLoader color="#FC673C" size={20} speedMultiplier={1.5} />
                                                                </div> */}
                                                                
                                                            </td>
                                                        </tr>
                                                    ):reviewDetails.length > 0 ? (
                                                        reviewDetails.map((rev:any,index:number)=>(
                                                            <tr key={index}>
                                                                <td>
                                                                    <div className="profile-img">
                                                                        <img
                                                                            src={rev.userImage || '/assets/images/profile/profile-md.png'}
                                                                            alt={rev.userWithAddress} 
                                                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                                                const target = e.currentTarget;
                                                                                target.onerror = null; // prevent infinite loop
                                                                                target.src = '/asssets/images/profile/profile-md.png'; // fallback image
                                                                            }}
                                                                        />
                                                                        {/* <img src="assets/images/profile/profile-md.png" alt=""/> */}
                                                                    </div>
                                                                </td>
                                                                <td>{rev.userWithAddress || ''}</td>
                                                                <td>{rev.decription || ''}</td>
                                                                <td>{rev.ratingOn || ''}</td>
                                                            </tr>
                                                        ))
                                                ):(
                                                        <tr>
                                                            <td colSpan={4} className="text-center text-muted py-4">
                                                                No reviews found
                                                            </td>
                                                        </tr>
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

export default ReviewListSection;
