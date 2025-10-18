// src/components/ProfileEditSection.tsx
import React, { useState, useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Trash2, Upload } from "lucide-react";
import { SquareLoader } from "react-spinners";
import { SyncLoader } from "react-spinners";

declare const Masonry: any;
const BASE_URL = import.meta.env.VITE_API_URL;

interface FavoriteActivity {
  title: string;
}

interface ProfileData {
    postTitle: string;
    UserId: string;
    Content: string;
    CategoryId: string;
    CountryId: string;
    StateId: string;
    CityId: string;
    favorite_activities: FavoriteActivity[];
}
interface Categorylist{
    id:string,
    name:string
}
interface CountryList{
    id:string,
    name:string
}
interface StateList{
    id:string,
    name:string
}
interface CityList{
    id:string,
    name:string
}
interface ImagePreview {
  file: File;
  preview: string;
}
const AddPostSection: React.FC = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFileName] = useState<File|null>(null);
    const [preview, setPreview] = useState<string|null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [imgMessage, setImgMessage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loadingFeed,setLoadingFeed] = useState(true);
    const [errorsFeed,setErrorsFeed] = useState('');
    const[getCategoryList,setCategoryList] = useState<Categorylist[]>([]);
    const[getCountryList,setCountryList] = useState<CountryList[]>([]);
    const[getCountryId,setCountryId] = useState<CountryList[]>([]);
    const[getStateList,setStateList] = useState<StateList[]>([]);
    const[getCityList,setCityList] = useState<CityList[]>([]);
    const [images, setImages] = useState<ImagePreview[]>([]);
    const [profileData, setProfileData] = useState<ProfileData>({
        postTitle: "",
        UserId: "",
        Content: "",
        CategoryId: "",
        CountryId: "",
        StateId: "",
        CityId: "",
        favorite_activities: [{"title":"Trails"}]
    });

    

    useEffect(() => {
            const storedId = localStorage.getItem("id");
            if (storedId) {
                // setUserId(storedId); 
                setUserId(storedId.trim());
            }  
        }, []);

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files?.[0];
    //     if (selectedFile) {
    //         setFileName(selectedFile);
    //         setImgMessage('Image uploaded successfully!');
    //         // Preview image
    //         const reader = new FileReader();
    //         reader.onloadend = () => setPreview(reader.result as string);
    //         reader.readAsDataURL(selectedFile);
    //     }
    // };
    
    //Multiple image upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const fileArray = Array.from(files);
        console.log(fileArray);
        const newImages: ImagePreview[] = [];

        fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImages((prev) => [...prev, { file, preview: reader.result as string }]);
        };
        reader.readAsDataURL(file);
        });

        setImgMessage("Image(s) uploaded successfully!");
        e.target.value = ""; // reset input to allow re-selecting same files
    };
    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDeleteImage =() =>{
        setPreview(null);
        setImgMessage('Removed Image.');
    }
    const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
    //    console.log('add',profileData.CountryId);
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleProfileUpdate = async () => {
        if (!userId) {
            setMessage('User ID not loaded yet!');
            return;
        }

        const formData = new FormData();
        formData.append("UserId", userId);
        formData.append("Title", profileData.postTitle);
        formData.append("Content", profileData.Content);
        formData.append("CategoryId", profileData.CategoryId);
        formData.append("CountryId", profileData.CountryId);
        formData.append("StateId", profileData.StateId);
        formData.append("CityId", profileData.CityId);
        if (file) formData.append("MediaFiles", file);

        try {
            const response = await axios.post(`${BASE_URL}/feed/create`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.status === "success") {
                setMessage('Feed added successfully!');
                
            } else {
                //alert(response.data.message || "Unexpected response from server");
            }
        } catch (error: any) {
            if (error.response?.data?.errors) {
            // Flatten array of messages into single string per field
            const formattedErrors: { [key: string]: string } = {};
            for (const key in error.response.data.errors) {
                formattedErrors[key] = error.response.data.errors[key].join(", ");
            }
            setErrors(formattedErrors);
            }
            console.error("Update failed:", error.response?.data || error);
            //alert("Failed to update feed. Check console for details.");
        }
    };
    useEffect(() => {
        const categoryList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/categorylist`);
                console.log(response.data.data);
                setCategoryList(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to fetch Category');
            } finally{
                setLoadingFeed(false);
            }
        };
        categoryList();
    }, []);

    useEffect(() => {
        const countryList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/countrylist`);
                console.log(response.data.data);
                setCountryList(response.data.data);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to fetch Country');
            } finally{
                setLoadingFeed(false);
            }
        };
        countryList();
    }, []);

    useEffect(() => {
        // console.log('countryId',profileData.CountryId);
        if (!profileData.CountryId) return;
        const stateList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/statelistbycountry/${profileData.CountryId}`);
                console.log('state',response.data.data);
                setStateList(response.data.data);
                // setPrak(response.data.data.parks);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to State');
            } finally{
                setLoadingFeed(false);
            }
        };
        stateList();
    }, [profileData.CountryId]);

    useEffect(() => {
        //console.log('StateId',profileData.StateId);
        if (!profileData.StateId) return;
        const cityList= async ()=>{
            try{
                //setLoadingFeed(true); // show loader every time fetch starts
                setErrorsFeed("");
                const response = await axios.get(`${BASE_URL}/common/citylistbystate/${profileData.StateId}`);
                console.log('state',response.data.data);
                setCityList(response.data.data);
                // setPrak(response.data.data.parks);
            }catch(err){
                console.error('API Error:', err);
                setErrorsFeed('Unable to State');
            } finally{
                setLoadingFeed(false);
            }
        };
        cityList();
    }, [profileData.StateId]);
   
   
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
            setMessage(null); 
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [message]);

    useEffect(() => {
        // Initialize Masonry after the component mounts
        const grid = document.querySelector('.edit-profile-row');
        if (grid && typeof Masonry !== 'undefined') {
        new Masonry(grid, {
            itemSelector: '.grid-item', // Adjust if your grid items have different classes
            percentPosition: true
        });
        }
    }, []);
   
    if (loadingFeed) {
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
    if (errorsFeed) return <p>{errorsFeed}</p>;
    if (getCategoryList.length === 0) return <p>NO Category found.</p>;
    if (getCountryList.length === 0) return <p>NO Country found.</p>;
    
    

  return (
    <main className="mainContent">
        <section className="section-profile-feed position-relative default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title">
                            <h2 className="title title-sm">Add Post</h2>
                            {message && <div style={{color:'#FC673C' , textAlign:'center'}}>{message}</div>}
                        </div>
                    </div>
                </div> 
                <div className="row g-4 edit-profile-row" data-masonry='{"percentPosition": true }'>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <>
                            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                               {/* {images.slice(0, 4).map((img, index) => (
                                <div key={index} style={{ position: "relative" }}>
                                    <img
                                    src={img.preview}
                                    alt={`preview-${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
                                    />
                                    <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "50%",
                                        width: "20px",
                                        height: "20px",
                                        cursor: "pointer",
                                    }}
                                    >
                                    &times;
                                    </button>
                                </div>
                                ))} */}
                                
                                <div className="upload-btn-wrapper" style={{display: "flex",alignItems: "center", gap: "100px"}}>
                                    <label htmlFor="thumbnail" style={{ minWidth: "150px" }}>Thumbnail Image</label>
                                    <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} /> 
                                </div>
                                           
                                            {/* <button type="button" className="btn"  onClick={() => fileInputRef.current?.click()} >
                                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8.5L19 8.5C21.2091 8.5 23 10.2909 23 12.5L23 17.5C23 19.7091 21.2091 21.5 19 21.5L7 21.5C4.79086 21.5 3 19.7091 3 17.5L3 12.5C3 10.2909 4.79086 8.5 7 8.5L9 8.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 5.5L13.7071 3.20711C13.3166 2.81658 12.6834 2.81658 12.2929 3.20711L10 5.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 3.5L13 15.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                Upload photo</button>
                                               
                                            <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} />
                                            {imgMessage && <div style={{color:'#FC673C' , fontSize: "11px",textAlign:'center'}}>{imgMessage}</div>}
                                           
                                        </div> */}
                                    {/* {images.length > 4 && (
                                        <div
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: "5px",
                                            background: "#eee",
                                            fontWeight: "bold",
                                            fontSize: "16px",
                                        }}
                                        >
                                        +{images.length - 4} more
                                        </div>
                                    )} */}
                            </div>
                            </>
                            {/* <div className="profile-info-edit d-flex align-items-center">
                                <div className="profile-img">
                                    <img
                                        src={preview || 'assets/images/profile/profile-md.png'}
                                        alt="Profile"
                                        width={100}
                                    />
                                    
                                    </div>
                                <div className="profile-info-edit-cn d-flex">
                                    <div className="pfe-title">
                                        <h3 className="pfe-name text-midnight-navy mb-0">Amit Singh</h3>
                                        <p className="pfe-location text-midnight-navy mb-0">Dubai, United Arab Emirates</p>
                                    </div>
                                    <div className="pfe-uplo d-flex align-items-center">
                                        <div className="upload-btn-wrapper">
                                           
                                            <button type="button" className="btn"  onClick={() => fileInputRef.current?.click()} >
                                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 8.5L19 8.5C21.2091 8.5 23 10.2909 23 12.5L23 17.5C23 19.7091 21.2091 21.5 19 21.5L7 21.5C4.79086 21.5 3 19.7091 3 17.5L3 12.5C3 10.2909 4.79086 8.5 7 8.5L9 8.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M16 5.5L13.7071 3.20711C13.3166 2.81658 12.6834 2.81658 12.2929 3.20711L10 5.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/><path d="M13 3.5L13 15.5" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                                Upload photo</button>
                                               
                                            <input type="file"  multiple ref={fileInputRef} onChange={handleFileChange} />
                                            {imgMessage && <div style={{color:'#FC673C' , fontSize: "11px",textAlign:'center'}}>{imgMessage}</div>}
                                           
                                        </div>
                                        <button className="delete-btn" onClick={handleDeleteImage}>
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.55063 9.23418C4.70573 8.10763 5.50954 6.5 6.91772 6.5H18.0823C19.4905 6.5 20.2943 8.10763 19.4494 9.23418V9.23418C18.8331 10.0558 18.5 11.0552 18.5 12.0823V18.5C18.5 20.7091 16.7091 22.5 14.5 22.5H10.5C8.29086 22.5 6.5 20.7091 6.5 18.5V12.0823C6.5 11.0552 6.16688 10.0558 5.55063 9.23418V9.23418Z" stroke="#717171" strokeWidth="1.5"/>
                                            <path d="M14.5 17.5L14.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M10.5 17.5L10.5 11.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M16.5 6.5L15.9558 4.86754C15.6836 4.05086 14.9193 3.5 14.0585 3.5H10.9415C10.0807 3.5 9.31638 4.05086 9.04415 4.86754L8.5 6.5" stroke="#717171" strokeWidth="1.5" strokeLinecap="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Bio</h2>
                            <div className="bg-lavender-gray bio">
                                <p className="mb-0 text-grey">Nature lover. Trail chaser. Sunrise enthusiast. <br /> I explore
                                    one path at a time — from hidden forest gems to epic mountain climbs. Always up
                                    for new trails and sharing honest tips to help others hike smarter.</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            <h2 className="profile-card-title text-midnight-navy">Post information</h2>
                            <div className="profile-inner-form">
                                <div className="form-floating mb-3">
                                    <input type="email" className={`form-control ${errors.Title ? "is-invalid" : ""}`} name="postTitle" id="postTitle" placeholder=""
                                        value={profileData.postTitle}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="postTitle">Title</label>
                                    {errors.Title && <div className="invalid-feedback">{errors.Title}</div>}
                                </div>
                                <div className="form-floating mb-3">
                                    
                                    <textarea
                                        className={`form-control ${errors.Title ? "is-invalid" : ""}`}
                                        name="Content"
                                        id="description"
                                        rows={4}
                                        placeholder="Enter about yourself"
                                        value={profileData.Content}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor="description">Description</label>
                                    {errors.Content && <div className="invalid-feedback">{errors.Content}</div>}
                                </div>
                                {/* <div className="form-floating mb-3">
                                    <input type="text" className="form-control" name="phone_no" id="phone" placeholder=""
                                         value={profileData.phone_no}
                                        onChange={handleInputChange}
                                         />
                                    <label htmlFor="phone">Phone Number</label>
                                </div>  */}
                                {/* <div className="mb-3">
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
                                </div> */}
                            </div>
                        </div>
                    </div> 
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item"> 
                        <div className="bg-almost-white br-20 profile-card-2 fav-acivities-card">
                            <h2 className="profile-card-title text-midnight-navy">Favorite activities</h2>
                            <div className="bg-almost-white d-flex flex-wrap fav-activity-list position-relative">
                                <div className="fav-activity-single active">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> 
                                    Hiking</div>
                                <div className="fav-activity-single active">
                                    <img src="assets/images/icons/check-white.svg" alt="" />
                                    Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single">
                                    <img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single"><img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div>
                                <div className="fav-activity-single"><img src="assets/images/icons/check-white.svg" alt="" /> Hiking</div> 
                                <div className="fav-activity-input"><input type="text" placeholder="Type here" /></div>
                                <div className="fav-activity-add-btn"> <button><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 2.08331V7.91665" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.08301 5H7.91634" stroke="#05073D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>  Add More</button></div>
                                
                            </div>
                            
                        </div>
                        <div className="my-4">
                            <button className="btn-style-1" onClick={handleProfileUpdate}>Add Post</button>
                            <button className="btn-style-0">Cancel</button>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
                        <div className="bg-almost-white br-20 profile-card-2">
                            {/* <h2 className="profile-card-title text-midnight-navy">Calorie counter info</h2> */}
                            <div className="profile-inner-form">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="CategoryId" id="category" 
                                                 value={profileData.CategoryId}
                                                onChange={handleInputChange} 
                                            >
                                                {
                                                    getCategoryList.map((cat:any, index:number)=>(
                                                        <option key={index} value={cat.id}>{cat.name}</option>
                                                    ))
                                                }
                                                 
                                            </select>
                                            <label htmlFor="category">Category</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="CountryId" id="CountryId"
                                                value={profileData.CountryId}
                                                onChange={handleInputChange}
                                            >   
                                                {
                                                    getCountryList.map((country:any, index:number)=>(
                                                        <option key={index} value={country.id}>{country.name}</option>
                                                    ))
                                                }
                                                {/* <option value="1">India</option>
                                                <option value="2">Dubai</option> */}
                                            </select>
                                            <label htmlFor="CountryId">Country</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="StateId" id="StateId"
                                            value={profileData.StateId}
                                                onChange={handleInputChange}
                                            >
                                                {
                                                    getStateList.map((state:any, index:number)=>(
                                                        <option key={index} value={state.id}>{state.name}</option>
                                                    ))
                                                }
                                                {/* <option value="1">State1</option>
                                                <option value="2">State2</option> */}
                                            </select>
                                            <label htmlFor="StateId">State</label>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="CityId" id="CityId"
                                            value={profileData.CityId}
                                                onChange={handleInputChange}
                                            >
                                                 {
                                                    getCityList.map((city:any, index:number)=>(
                                                        <option key={index} value={city.id}>{city.name}</option>
                                                    ))
                                                }
                                                {/* <option value="1">city1</option>
                                                <option value="2">city2</option> */}
                                            </select>
                                            <label htmlFor="CityId">City</label>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                        <div className="form-floating mb-3"> 
                                                <input type="text" className="form-control" placeholder="" name="birthday_date" id="birthdate"  
                                                value={profileData.birthday_date}
                                                onChange={handleInputChange}
                                                /> 
                                            <label htmlFor="birthdate">Date</label>
                                        </div>
                                            
                                    </div>
                                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12">
                                            <div className="form-floating mb-3">
                                            <input type="text" className="form-control" placeholder="" name="birthday_year" id="birthYear"  
                                             value={profileData.birthday_year}
                                                onChange={handleInputChange}
                                            /> 
                                            <label htmlFor="birthYear">Year</label>
                                        </div>                                             
                                    </div> */}
                                    
                                    {/* <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="form-floating mb-3">
                                            <select className="form-select" name="language" id="mktLang">
                                                <option >English[US]</option>
                                                <option value="">Hindi</option>
                                            </select>
                                            <label htmlFor="mktLang">Marketing Language</label>
                                        </div>
                                    </div> */}
                                    
                                </div>

                            </div>
                        </div>
                        
                    </div>
                    
                    
                    
                    {/* <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 grid-item">
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
                    </div>  */}
                    
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

export default AddPostSection;