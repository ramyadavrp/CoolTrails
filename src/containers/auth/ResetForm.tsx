import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {validate,LoginFields,ErrorFields } from '../../utils/validation';
import { useAutoClearMessage } from '../../utils/useAutoClearMessage';
import { useAlertMessage } from '../../utils/useAlertMessage';
import { getAuth } from '../../utils/storage'; 
const BASE_URL = import.meta.env.VITE_API_URL;


type PasswordField = 'old' | 'new' | 'confirm';
const ResetForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    // const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState<string>("");
    useAutoClearMessage(message, setMessage, 3000);
    const [showPassword, setShowPassword] = useState<Record<PasswordField, boolean>>({
        old: false,
        new: false,
        confirm: false,
    });

    const token = new URLSearchParams(window.location.search).get("token");

    // const togglePasswordVisibility = () => {
    //     setShowPassword(prev => !prev);
    // };
    const togglePasswordVisibility = (field:PasswordField) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    useEffect(() => {
        const { userId} = getAuth();
                if (userId) setUserId(userId);
    }, []);
    // console.log('uuu',userId);
    const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{6,}$/;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         if (!userId) return;
        setError("");
        setMessage("");
        if (!password || !confirmPassword) {
            setError("Both fields are required");
            return;
        }
        if (!passwordRegex.test(password)) {
            setError(
                "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Password and Confirm Password do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(`${BASE_URL}/user/Reset-Password`, {
                userid: userId,
                old_password:oldPassword,
                new_password:password,
            });
            console.log(response);
            if (response.data.status === "success") {
                useAlertMessage({
                    icon: "success",
                    title: "Done!",
                    html: "<strong>Password updated successfully</strong>",
                    confirmButtonText: "Ok!",
                    width: "350px",
                    confirmButtonColor: "#fc673c",
                    padding: "1rem",
                });
                setOldPassword(""); 
                setPassword(""); 
                setConfirmPassword("");
            } else{
                setError(response.data.message);
            }

        } catch (err: any) {
            setError(err.response.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    
    };


    return (
        <section className="section-login py-3">
            <div className="container" style={{display:'flex',justifyItems:'center'}}>
                <div className="row g-2" style={{width:'100%',justifyContent:'center'}}>
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                        <div className="login-container bg-almost-white br-20 h-100">
                            {message && <p style={{color:'green',fontSize:'14px',textAlign:'center'}} >{message}</p>}
                                <h1 className="login-title text-center">Create New Password</h1> <p style={{textAlign:'center'}}>Please create a new password for your account.</p>
                                <div className="login-form-container">
                                    <form onSubmit={handleSubmit} className="login-form mb-4">
                                        <div className="form-floating">
                                            <input type={showPassword.old ? "text" : "password"}
                                            name="oldPassword" className="form-control" id="oldPassword"
                                                placeholder="Old Password" value={oldPassword} onChange={(e) => {
                                                    setOldPassword(e.target.value);
                                                    setError("");
                                                }} />
                                            <label htmlFor="oldPassword">Old Password</label>
                                            <i className={`toggle-password bi ${showPassword.old ? "bi-eye-slash" : "bi-eye" }`}
                                                onClick={() => togglePasswordVisibility("old")}
                                            />
                                        </div>
                                        <div className="form-floating">
                                            <input
                                                type={showPassword.new ? "text" : "password"}
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                placeholder="New Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <label htmlFor="password">New Password</label>
                                            <i className={`toggle-password bi ${showPassword.new ? "bi-eye-slash" : "bi-eye" }`}
                                                onClick={() => togglePasswordVisibility("new")}
                                            />
                                            {/* <i className={`toggle-password bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                                onClick={togglePasswordVisibility}
                                            ></i> */}
                                        </div>
                                        <div className="form-floating">
                                            <input type={showPassword.confirm ? "text" : "password"} 
                                            name="confirmPassword" className="form-control" id="confirmPassword"
                                                placeholder="Confirm Password" value={confirmPassword} onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                    setError("");
                                                }} />
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <i className={`toggle-password bi ${showPassword.confirm ? "bi-eye-slash" : "bi-eye" }`}
                                                onClick={() => togglePasswordVisibility("confirm")}
                                            />
                                        </div>
                                        {error && <p style={{color:'red',fontSize:'14px'}}  className="error">{error}</p>}
                                        <button type="submit" className="btn-style-1 w-100" disabled={loading}>{loading ? "Updating..." : "Reset Password"}</button>
                                    </form>
                                
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetForm;
