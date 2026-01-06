import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {validate,LoginFields,ErrorFields } from '../../utils/validation';
const BASE_URL = import.meta.env.VITE_API_URL;

const ForgotForm = () => {


    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string>("");
    
    const isValidEmail = (value: string): boolean => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if(!email.trim()) setError("Email address is required");
        if(!isValidEmail(email)) setError("Please enter a valid email address");
        try {
            setLoading(true);
            // Api call
            console.log("Valid email:", email);

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    
    };


    return (
        <section className="section-login py-3">
        <div className="container" style={{display:'flex',justifyItems:'center'}}>
            <div className="row g-2" style={{width:'100%',justifyContent:'center'}}>
                {/* <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="login-cover d-xl-block d-lg-block d-md-block d-sm-none d-none h-100">
                        <img src="assets/images/login/login-bg.jpg" alt="" className="w-100 h-100 br-20" />
                    </div>
                </div> */}
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="login-container bg-almost-white br-20 h-100">
                            <h1 className="login-title text-center">Forgot Password</h1> <p style={{textAlign:'center'}}>Please enter your email address and we'll send you a link to reset your password..</p>
                            <div className="login-form-container">
                                <form onSubmit={handleSubmit} className="login-form mb-4">
                                    <div className="form-floating">
                                        <input type="text" name="email" className="form-control" id="username"
                                            placeholder="name@example.com" value={email} onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError("");
                                            }} />
                                        <label htmlFor="username">Email address</label>
                                        {error && <p style={{color:'red',fontSize:'14px'}}  className="error">{error}</p>}
                                    </div>
                                    
                                    <button type="submit" className="btn-style-1 w-100" disabled={loading}>{loading ? "Sending..." : "Submit"}</button>
                                </form>
                            
                            </div>

                        </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default ForgotForm;
