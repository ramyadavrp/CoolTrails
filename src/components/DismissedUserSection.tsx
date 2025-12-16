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
const DismissedUserSection: React.FC = () => {
    

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
                                            <tr>
                                                <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                                <td>User 1</td>
                                                <td>text Blocked</td>
                                                <td>10 Oct,2025</td>
                                            </tr>
                                            <tr>
                                                <td><div className="profile-img"><img src="assets/images/profile/profile-md.png" alt=""/></div></td>
                                                <td>User 1</td>
                                                <td>text Blocked</td>
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

export default DismissedUserSection;
