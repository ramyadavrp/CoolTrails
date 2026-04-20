// src/components/ProfileEditSection.tsx
import React, { useState, useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Trash2, Upload } from "lucide-react";
import  {useAutoClearMessage} from '../utils/useAutoClearMessage';
import {getAuth} from '../utils/storage';
import {useAlertMessage,closeLoader,useLoader}  from '../utils/useAlertMessage';

declare const Masonry: any;
const BASE_URL = import.meta.env.VITE_API_URL;

interface FavoriteActivity {
  title: string;
}

interface ProfileData {
    email: string;
    full_name: string;
    last_name: string;
    phone_no: string;
    about_me: string;
    member_location: string;
    units: string;
    activity_time_preference: string;
    height: string;
    weight: string;
    birthday_month: string;
    birthday_date: string;
    birthday_year: string;
    language: string; 
    new_password: string;
    favorite_activities: FavoriteActivity[];
}
interface ALLActivity {
    explore_image: string,
    explore_title: string,
    explore_address: string,
    explore_rating: any,
    explore_distance: any,
    explore_time_duration: number,
    date: number
}

interface Profile {
  fullName: string;
  address: string;
  abount: string;
  picturePath: string;
  registeredOn: string;
  totalFollowers: number;
  totalFollowing: number;
}

const ProfileEditSection: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFileName] = useState<File|null>(null);
    const [preview, setPreview] = useState<string|null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [imgmessage, setImgMessage] = useState<string | null>(null);
    const [uploading, setUploading] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>("");
    const [getAllActivity, setAllActivity] = useState<ALLActivity[]>([]);
    // input field check
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [profile, setProfile] = useState<Profile | null>(null);
    // Use hook for each Clear  message after success
    useAutoClearMessage(message, setMessage, 3000);
    useAutoClearMessage(imgmessage, setImgMessage, 3000);
    const [token, setToken] = useState<string | null>(null);
    
    const [profileData, setProfileData] = useState<ProfileData>({
        full_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        about_me: "",
        favorite_activities: [],
        member_location: "",
        units: "",
        activity_time_preference: "",
        height: "",
        weight: "",
        birthday_month: "",
        birthday_date: "",   
        birthday_year: "",
        language: "",
        new_password: ""
    });
    // Get id by helper
    useEffect(() => {
        const { userId ,token} = getAuth();
        if (userId) setUserId(userId);
         if (token) setToken(token);
    }, []);

    
    // Show the profile
    useEffect(() => {
            if (!userId) return; // wait until userId is available
    
            const loadProfile = async () => {
                try {
                const response = await axios.post(`${BASE_URL}/user/profile`, 
                    {UserId: userId},
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                     
                );
    
                // console.log("Profile get Data:", response.data.data);
    
                if (response.data.status === "success") {
                    const d = response.data.data;
                    setProfile(d);
                    setProfileData({
                        full_name: d.fullName || "",
                        last_name: "", // If not provided by API
                        email: d.email || "",
                        phone_no: d.phone_no || "",
                        about_me: d.abount || "",
                        // favorite_activities: d.favoriteactivities || [],favoriteactivities
                       
                        favorite_activities: Array.isArray(d.favoriteactivities)
                        ? d.favoriteactivities.map((item: any) => ({
                            title: item.name?.trim()   
                            }))
                        : [],
                        member_location: d.address || "",
                        units: d.units || "",
                        activity_time_preference: d.activity_time_preference || "",
                        height: d.height != null ? Number(d.height).toFixed(1) : "",
                        weight: d.weight != null ? Number(d.weight).toFixed(2) : "",
                        birthday_month: d.month || "",
                        birthday_date: d.day || "",
                        birthday_year: d.year || "",
                        language: d.language || "",
                        new_password: ""
                    });
                    
                }
                } catch (error:any) {
                    useAlertMessage({
                        title: "Upload Failed",
                        html: "<strong>Error uploading images. Please try again.</strong>",
                        icon: "error",
                        width: "350px",
                        confirmButtonText: "OK",
                        confirmButtonColor: "#dc3545",
                    });
                }
            };
    
            loadProfile();
    }, [userId]);

    
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/home/topcategory/20`);
                setAllActivity(response.data.data);
                    // console.log('Alltopcategory',response.data.data);
            } catch (error) {
                console.error('API Error:', error);
                // setErrorLocatTrails('Unable to fetch top local trails');
            } finally {
                // setloadingExplore(false);
            }
        }
        fetchActivity();
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file);
        setPreview(URL.createObjectURL(file));

        // Automatically upload
        const formData = new FormData();
        formData.append("userid", userId); 
        formData.append("profile_photo", file);

        try {
            const res = await axios.post(`${BASE_URL}/user/updateprofilephoto`, formData,
                {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("Uploaded:", res.data);
            if (res.data.status === "success") {
                // If backend returns image URL, use it
                 const newImageUrl =
                res.data.data?.profile_photo_url ||
                res.data.data?.profile_url ||
                null;
                console.log("newImageUrl:", newImageUrl);
                console.log("profile:",profile );
            if (newImageUrl) {
                setPreview(newImageUrl);
                // Also update profile state so <img src={profile?.picturePath}> updates
                setProfile((prev) => ({
                ...prev!,
                picturePath: newImageUrl,
                }));
            }
                // if (res.data.data?.profile_photo_url) {
                //     setPreview(res.data.data.profile_photo_url); 
                // }
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Images uploaded successfully!</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
            } else {
                useAlertMessage({
                    title: "Failed",
                    html: `<strong>${res.data.message  || "Upload failed — server rejected"}</strong>`,
                    icon: "error",
                    width: "350px",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                    padding: "1rem",
                });
            }
            // setTimeout(() => setImgMessage(""), 2000);
        } catch (err) {
            console.error("Upload error:", err);
        }
    };

    const handleDeleteImage = () =>{
        setFileName(null);
    }
    const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const MAX_WORDS = 30;
        const { name, value } = e.target;
        // console.log('ddssd',value);
        if (name === "about_me") {
            const words = value.trim().split(/\s+/); 

            // Prevent typing beyond 30 words
            if (words.length > MAX_WORDS) return;
        }
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors((prev) => ({ ...prev, [name] :""}));
    };

    const getPayload = () => ({
    ...profileData,
        favorite_activities: profileData.favorite_activities.length
        ? profileData.favorite_activities.map(a => ({ title: a.title }))
        : [{ title: "Walking" }],
        
    });
    

    const handleActivityToggle = (activity: string) => {
        // console.log('activityactivity',activity);
        setProfileData((prev) => {
            const exists = prev.favorite_activities.some((a) => a.title === activity);
            const updatedActivities = exists
            ? prev.favorite_activities.filter((a) => a.title !== activity)
            : [...prev.favorite_activities, { title: activity }];

            return { ...prev, favorite_activities: updatedActivities };
        });
    };

    const handleProfileUpdate = async () => {
        const payload = getPayload();
        const newErrors: { [key: string]: string } = {};
        const positiveNumber = /^(?:\d+|\d*\.\d+)$/;

        if (!payload.weight) {
        newErrors.weight = "Weight is required";
        } 
        else if (!positiveNumber.test(payload.weight)) {
        newErrors.weight = "Enter a valid positive number (no minus allowed)";
        }
        if (!payload.height) {
        newErrors.height = "Height is required";
        } 
        else if (!positiveNumber.test(payload.height)) {
        newErrors.height = "Enter a valid positive number (no minus allowed)";
        }
        if (!payload.full_name) newErrors.full_name = "Full name is required";
        if (!payload.about_me) {
            newErrors.about_me = "Bio field is required";
            } else {
            const wordCount = payload.about_me.trim().split(/\s+/).length;

            if (wordCount > 30) {
                newErrors.about_me = "Bio must not exceed 30 words";
            }
        }

        if (!payload.birthday_month) newErrors.birthday_month = "Birthday Month is required";
        if (!payload.birthday_date) newErrors.birthday_date = "Birthday Date is required";
        if (!payload.birthday_year) newErrors.birthday_year = "Birthday Year is required";
        if (!payload.email) newErrors.email = "Email address is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            const firstInvalid = document.querySelector(".is-invalid") as HTMLElement;
            if (firstInvalid) {
            firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
            firstInvalid.focus();
            }
            return;
        }
        //if (Object.keys(newErrors).length > 0) return; // stop submission if errors exist

        try {
            useLoader("Please wait...", "Profile Updating...");
            const response = await axios.post(`${BASE_URL}/user/profileupdate`, payload, {
            // headers: {
                // "Content-Type": "multipart/form-data",
                // "Authorization": `Bearer ${token}`
                // } 
            });
            closeLoader();
            // console.log('profile update',response.data.data);
            if (response.data.status === "success") {
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Profile Updated Successfully!</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
                setTimeout(() => {}, 1500);
            } else {
                useAlertMessage({
                    title: "Failed",
                    html: `<strong>${response.data.message || "Update failed — server rejected"}</strong>`,
                    icon: "error",
                    width: "350px",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#dc3545",
                    padding: "1rem",
                });
            }
        } catch (error: any) {
            closeLoader();
            useAlertMessage({
                title: "Update failed",
                html: "<strong>Error updating profile. Please try again.</strong>",
                icon: "error",
                width: "350px",
                confirmButtonText: "OK",
                confirmButtonColor: "#dc3545",
            });
        }
    };

        // useEffect(() => {
        //     if (message) {
        //         const timer = setTimeout(() => {
        //         setMessage(null); 
        //         }, 3000); 

        //         return () => clearTimeout(timer);
        //     }
        // }, [message]);
        useEffect(() => {
            // Initialize Masonry after the component mounts
            const grid = document.querySelector('.edit-profile-row');
            if (grid && typeof Masonry !== 'undefined') {
            new Masonry(grid, {
                itemSelector: '.grid-item', // Adjust if your grid items have different classes
                percentPosition: true
            });
            }
        }, [profile, getAllActivity]);
        // about bio count word limit
        const aboutMeWordCount = profileData.about_me?.trim()
            ? profileData.about_me.trim().split(/\s+/).length
            : 0;


  return (
    <main className="mainContent">
        <section className="section-profile-feed position-relative default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title">
                            <h2 className="title title-sm">Edit Profile</h2>
                            {message && <div style={{color:'#FC673C' , textAlign:'center'}}>{message}</div>}
                        </div>
                    </div>
                </div> 
                <div className="row g-4 edit-profile-row" data-masonry='{"percentPosition": true }'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <div className="profile-info-edit d-flex align-items-center">
                                <div className="profile-img">
                                    {/* <img
                                        src={preview || 'assets/images/profile/profile-md.png'}
                                        alt="Profile"
                                        width={100}
                                    /> */}
                                    <img
                                        src={preview || profile?.picturePath || "/assets/images/not-found.jpg"}
                                        alt="Profile"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.onerror = null;
                                            target.src = "/assets/images/not-found.jpg";
                                        }}
                                    />

                                    {/* <img src="assets/images/profile/profile-md.png" alt="Amit Singh" /> */}
                                </div>
                                <div className="profile-info-edit-cn d-flex">
                                    <div className="pfe-title">
                                        <h3 className="pfe-name text-midnight-navy mb-0">{profile?.fullName ?? ''}</h3>
                                        <p className="pfe-location text-midnight-navy mb-0">{profile?.address ?? ''}</p>
                                    </div>
                                    <div className="pfe-uplo d-flex align-items-center">
                                        <div className="upload-btn-wrapper">
                                           
                                            <button type="button" className="btn"  onClick={() => fileInputRef.current?.click()} >
                                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8.5L19 8.5C21.2091 8.5 23 10.2909 23 12.5L23 17.5C23 19.7091 21.2091 21.5 19 21.5L7 21.5C4.79086 21.5 3 19.7091 3 17.5L3 12.5C3 10.2909 4.79086 8.5 7 8.5L9 8.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 5.5L13.7071 3.20711C13.3166 2.81658 12.6834 2.81658 12.2929 3.20711L10 5.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 3.5L13 15.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                Upload photo</button>
                                                {imgmessage && <div style={{color:'#FC673C' , fontSize: "11px",textAlign:'center'}}>{imgmessage}</div>}
                                            <input type="file" ref={fileInputRef} onChange={handleFileChange} />
                                        </div>
                                        {/* <button className="delete-btn" onClick={handleDeleteImage}>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.55063 9.23418C4.70573 8.10763 5.50954 6.5 6.91772 6.5H18.0823C19.4905 6.5 20.2943 8.10763 19.4494 9.23418V9.23418C18.8331 10.0558 18.5 11.0552 18.5 12.0823V18.5C18.5 20.7091 16.7091 22.5 14.5 22.5H10.5C8.29086 22.5 6.5 20.7091 6.5 18.5V12.0823C6.5 11.0552 6.16688 10.0558 5.55063 9.23418V9.23418Z" stroke="#717171" strokeWidth="1.5"/>
                                            <path d="M14.5 17.5L14.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M10.5 17.5L10.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16.5 6.5L15.9558 4.86754C15.6836 4.05086 14.9193 3.5 14.0585 3.5H10.9415C10.0807 3.5 9.31638 4.05086 9.04415 4.86754L8.5 6.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Bio</h2>
                            <div className="bg-lavender-gray bio">
                                <p className="mb-0 text-grey"> {profile?.abount ?? ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Personal information</h2>
                            <div className="profile-inner-form">
                                <div className="form-floating mb-3">
                                    <input type="email" className={`form-control ${errors.email ? "is-invalid bg-danger bg-opacity-10" : ""}`} name="email" id="emailIn" placeholder=""
                                        value={profileData.email}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="emailIn">Email address</label>
                                    
                                     {errors.email && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className={`form-control ${errors.full_name ? "is-invalid bg-danger bg-opacity-10" : ""}`}
                                     name="full_name" id="full_name" placeholder=""
                                        value={profileData.full_name}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="fullName">Full Name</label>
                                     {errors.full_name && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.full_name}</div>}
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="text" className={`form-control ${errors.phone_no  ? "is-invalid" : ""}`} name="phone_no" id="phone" placeholder=""
                                         value={profileData.phone_no}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="phone">Phone Number</label>
                                     {errors.phone_no && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.phone_no}</div>}
                                </div> 
                                <div className="mb-3">
                                    <div className="input-group flex-nowrap custom-form-group">
                                        <span className="input-group-text" id="addon-wrapping">
                                            <svg width="13" height="16" viewBox="0 0 10 13" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.68182 5.21429C8.68182 4.19131 8.29391 3.21023 7.60344 2.48687C6.91296 1.76352 5.97648 1.35714 5 1.35714C4.02352 1.35714 3.08704 1.76352 2.39656 2.48687C1.70609 3.21023 1.31818 4.19131 1.31818 5.21429C1.31818 6.79657 2.52664 8.85886 5 11.3291C7.47336 8.85886 8.68182 6.79657 8.68182 5.21429ZM5 12.5C1.99973 9.64314 0.5 7.214 0.5 5.21429C0.5 3.96398 0.974106 2.76488 1.81802 1.88078C2.66193 0.996682 3.80653 0.5 5 0.5C6.19347 0.5 7.33807 0.996682 8.18198 1.88078C9.02589 2.76488 9.5 3.96398 9.5 5.21429C9.5 7.214 8.00027 9.64314 5 12.5Z"
                                                    fill="#05073D" />
                                                <path
                                                    d="M5.00004 6.5C5.32554 6.5 5.6377 6.36454 5.86786 6.12342C6.09802 5.8823 6.22732 5.55528 6.22732 5.21428C6.22732 4.87329 6.09802 4.54626 5.86786 4.30515C5.6377 4.06403 5.32554 3.92857 5.00004 3.92857C4.67455 3.92857 4.36239 4.06403 4.13223 4.30515C3.90207 4.54626 3.77277 4.87329 3.77277 5.21428C3.77277 5.55528 3.90207 5.8823 4.13223 6.12342C4.36239 6.36454 4.67455 6.5 5.00004 6.5ZM5.00004 7.35714C4.45756 7.35714 3.93729 7.13138 3.55369 6.72951C3.17009 6.32765 2.95459 5.7826 2.95459 5.21428C2.95459 4.64596 3.17009 4.10092 3.55369 3.69905C3.93729 3.29719 4.45756 3.07143 5.00004 3.07143C5.54253 3.07143 6.0628 3.29719 6.4464 3.69905C6.83 4.10092 7.0455 4.64596 7.0455 5.21428C7.0455 5.7826 6.83 6.32765 6.4464 6.72951C6.0628 7.13138 5.54253 7.35714 5.00004 7.35714Z"
                                                    fill="#05073D" />
                                            </svg>
                                        </span>
                                        <input type="text" className="form-control" name="member_location" placeholder="Location"
                                        value={profileData.member_location}
                                        onChange={handleInputChange}
                                            aria-label="Username" aria-describedby="addon-wrapping" />
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                   <textarea
                                        className={`form-control ${errors.about_me ? "is-invalid" : ""}`}
                                        name="about_me"
                                        id="about_me"
                                        rows={5}
                                        placeholder="Enter about yourself"
                                        value={profileData.about_me}
                                        onChange={handleInputChange}
                                         style={{ minHeight: "120px", resize: "vertical" }}
                                        />

                                        <div className="d-flex justify-content-between mt-1">
                                        <small className="text-muted">
                                            {aboutMeWordCount} / 30 words
                                        </small>

                                        {errors.about_me && (
                                            <small className="text-danger">{errors.about_me}</small>
                                        )}
                                        </div>
                                </div>  
                                
                            </div>
                        </div>
                    </div>  
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item"> 
                        <div className="bg-almost-white br-20 profile-card-2 fav-acivities-card">
                            <h2 className="profile-card-title text-midnight-navy">Favorite activities</h2>
                            <div className="bg-almost-white d-flex flex-wrap fav-activity-list position-relative">
                               
                                {
                                    getAllActivity.map((act: any, index: number) => {
                                    const isSelected = profileData.favorite_activities.some(
                                        (a) =>
                                            a.title?.trim().toLowerCase() ===
                                            act.title?.trim().toLowerCase()
                                        );
                                        // console.log('favorite_activities',isSelected);
                                        return (
                                        
                                            <div key={index} className={`fav-activity-single ${isSelected ? "active" : ""}`}
                                                onClick={() => handleActivityToggle(act.title)}
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: isSelected ? "#05073D" : "#f8f9fa",
                                                    color: isSelected ? "#fff" : "#333", padding: "8px 12px",
                                                    borderRadius: "60px", margin: "5px",display: "flex",alignItems: "center", transition: "all 0.2s ease",
                                                }}
                                                >
                                                    {/* <img src="assets/images/icons/check-white.svg" alt="" /> */}
                                                <img  src="assets/images/icons/check-white.svg" alt=""
                                                    style={{ 
                                                        width: "16px", height: "16px", marginRight: "6px",visibility: isSelected ? "visible" : "hidden",
                                                    }}
                                                />
                                                {act.title}
                                            </div>
                                        );
                                    })
                                }
                                
                                {/* <div className="fav-activity-single active">
                                    <img src="assets/images/icons/check-white.svg" alt="" />Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking
                                </div> 
                                <div className="fav-activity-input"><input type="text" placeholder="Type here" /></div>
                                <div className="fav-activity-add-btn">
                                     <button><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2.08331V7.91665" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.08301 5H7.91634" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>  Add More</button>
                                </div> */}
                                
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="row g-4">
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bg-almost-white br-20 profile-card-2 radio-card">
                                    <h2 className="profile-card-title text-midnight-navy">Units</h2>
                                    <div className="pc-radio">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="units" id="imp"
                                                value="Imperial"
                                                checked={profileData.units === "Imperial"}
                                                onChange={handleInputChange}
                                                />
                                            <label className="form-check-label" htmlFor="imp">Imperial</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="units" id="metr"
                                                value="Metric"
                                                checked={profileData.units === "Metric"}
                                                onChange={handleInputChange}
                                                 />
                                            <label className="form-check-label" htmlFor="metr">Metric</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="bg-almost-white br-20 profile-card-2 radio-card">
                                    <h2 className="profile-card-title text-midnight-navy">Activity time preference</h2>
                                    <div className="pc-radio">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="activity_time_preference" id="spd"
                                                value="Speed"
                                                checked={profileData.activity_time_preference === "Speed"}
                                                onChange={handleInputChange}
                                                 />
                                            <label className="form-check-label" htmlFor="spd">Speed</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="activity_time_preference" id="pace"
                                                value="Pace"
                                                checked={profileData.activity_time_preference === "Pace"}
                                                onChange={handleInputChange} 
                                                 />
                                            <label className="form-check-label" htmlFor="pace">Pace</label>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Calorie counter info</h2>
                            <div className="profile-inner-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={`form-control ${errors.height ? "is-invalid" : ""}`} placeholder="" name="height" id="height"  
                                             value={profileData.height}
                                                onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="height">Height (Feet / Inch)</label>
                                            {errors.height && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.height}</div>}
                                        </div> 
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={`form-control ${errors.weight ? "is-invalid" : ""}`} placeholder="" name="weight" id="weight"  
                                             value={profileData.weight}
                                                onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="weight">Weight (Kilo / Gram)</label>
                                            {errors.weight && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.weight}</div>}
                                        </div>  
                                    </div>
                                    
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className={`form-select ${errors.birthday_month ? "is-invalid" : ""}`}  name="birthday_month" id="birthday_month"
                                            value={profileData.birthday_month}
                                                onChange={handleInputChange}
                                            >
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                            <label htmlFor="birthday_month">Birthday</label>
                                            {errors.birthday_month && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.birthday_month}</div>}
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className={`form-control ${errors.birthday_date ? "is-invalid" : ""}`} placeholder="" name="birthday_date" id="birthdate"  
                                                value={profileData.birthday_date}
                                                onChange={handleInputChange}
                                                /> 
                                            <label htmlFor="birthdate">Date</label>
                                            {errors.birthday_date && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.birthday_date}</div>}
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <input type="text" className={`form-control ${errors.birthday_year ? "is-invalid" : ""}`} placeholder="" name="birthday_year" id="birthYear"  
                                             value={profileData.birthday_year}
                                                onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="birthYear">Year</label>
                                            {errors.birthday_year && <div style={{color:'#FC673C'}} className="invalid-feedback">{errors.birthday_year}</div>}
                                        </div>                                             
                                    </div>
                                    
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="language" id="mktLang"
                                            value={profileData.language}
                                                onChange={handleInputChange}
                                            >
                                                <option value="English">English[US]</option>
                                                <option value="Hindi">Hindi</option>
                                            </select>
                                            <label htmlFor="mktLang">Marketing Language</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" placeholder="" name="new_password" id="password" 
                                            value={profileData.new_password}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor="password">Set a new password</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                            <div className="my-4">
                            <button className="btn-style-1" onClick={handleProfileUpdate}>Save Chanegs</button>
                            <button className="btn-style-0">Cancel</button>
                        </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Social Media</h2>
                            <div className="platform-logins">
                                <a href="" className="login-btn mb-2"> <img src="assets/images/icons/facebook-color.svg"
                                        alt="" /> Connect with Facebook</a>
                                <a href="" className="login-btn mb-2"> <img src="assets/images/icons/instagram-2.png"
                                        alt="" /> Connect with Instagram</a>
                            </div>

                        </div>
                    </div> */}
                </div> 
            </div>
        </section>
    </main>
  );
};

export default ProfileEditSection;