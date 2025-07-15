import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
    const navigate = useNavigate();
    //const [isSignUp, setIsSignUp] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        navigate("/");
        }
    }, [navigate]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        // firstName: "",
        // lastName: "",
        fullName:"",
        signupEmail: "",
        mobile: "",
        signupPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateSignUp = () => {
        const newErrors: Record<string, string> = {};
        //if (!formData.firstName.trim()) newErrors.firstName = "First name is required.";
        //if (!formData.lastName.trim()) newErrors.lastName = "Last name is required.";
        if (!formData.fullName.trim()) newErrors.Fullname = "Full name is required.";
        if (!formData.signupEmail.trim()) {
        newErrors.signupEmail = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.signupEmail)) {
        newErrors.signupEmail = "Email is invalid.";
        }
        if (!formData.mobile.trim()) {
        newErrors.mobile = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = "Mobile number must be 10 digits.";
        }
        // if (!formData.signupPassword.trim()) {
        //   newErrors.signupPassword = "Password is required.";
        // } else if (formData.signupPassword.length < 6) {
        //   newErrors.signupPassword = "Password must be at least 6 characters.";
        // }

        // Password validation
        const password = formData.signupPassword; // Do NOT trim password before testing regex, it might remove leading/trailing spaces if allowed. Trim it for storage/sending to backend.
        // UPDATED REGEX: Added '#' to the allowed special characters
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_#-])[A-Za-z\d@$!%*?&_#-]{6,}$/;
        // I also added '_' and '-' as they are common. Adjust as needed for your exact allowed special characters.

        if (!password) { // Check if password is empty
            newErrors.signupPassword = "Password is required.";
        } else if (password.length < 6) { // Check minimum length first
             newErrors.signupPassword = "Password must be at least 6 characters.";
        } else if (!passwordRegex.test(password)) { // Then test against the full regex
            newErrors.signupPassword = "Password must include 1 uppercase, 1 lowercase, 1 number, and 1 special character.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMsg('');
        setErrorMsg('');
        setError(null);

        let fullname = formData.fullName.trim().split(' '); // split full name
        let firstName = fullname[0]
        let lastName = fullname.slice(1).join(" ")||" "; // remaining name

        if (!validateSignUp()) return;

        setLoading(true);

        try {
        const response = await axios.post(`${BASE_URL}/user/createuser`, {
            email: formData.signupEmail,
            first_name:firstName,
            last_name: lastName,
            //: formData.fullName,
            new_password: formData.signupPassword,
            phone_no: formData.mobile,
        });

        const data = response.data;
        console.log(data);

        if (data.status === "success") {
            //localStorage.setItem("token", data.token);
            setSuccessMsg('Registered successfully!');
            //setFormData({ firstName: '', lastName: '', signupEmail: '', mobile: '', signupPassword: '' });
            //setFormData({ firstName: '', lastName: '', signupEmail: '', mobile: '', signupPassword: '' });
            setFormData({ fullName: '', signupEmail: '', mobile: '', signupPassword: '' });
            setFormData({  fullName: '', signupEmail: '', mobile: '', signupPassword: '' });
            setErrors({});
            navigate('/login');
        } else {
            setErrorMsg(data.message || 'Signup failed');
        }
        } catch (err: any) {
        setErrorMsg(err.response?.data?.message || "Server error. Please try again later.");
        } finally {
        setLoading(false);
        }
    };
  
  return (
      <section className="section-login py-3">
        <div className="container">
            <div className="row g-2">
                <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                    <div className="login-cover d-xl-block d-lg-block d-md-block d-sm-none d-none h-100">
                        <img src="assets/images/login/signup-img.jpg" alt="" className="w-100 h-100 br-20" />
                    </div>
                </div>
                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                    <div className="login-container bg-almost-white br-20 h-100">
                        <h1 className="login-title text-center">Create your account</h1>
                        <div className="login-form-container">
                            <form onSubmit={handleSignUp} className="login-form mb-4">
                                {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}
                                {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
                                <div className="form-floating">
                                    <input type="email" name="signupEmail" className="form-control" id="username"
                                        placeholder="name@example.com" value={formData.signupEmail} onChange={handleChange} />
                                    <label htmlFor="username">Email address</label>
                                    {errors.signupEmail && <p className="text-red-500 text-xs">{errors.signupEmail}</p>}
                                </div>
                                {/* <div className="form-floating">
                                    <input type="text" name="firstName" className="form-control" id="Firstname"
                                        placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                                    <label htmlFor="Firstname">First Name</label>
                                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                                </div>
                                <div className="form-floating">
                                    <input type="text" name="lastName" className="form-control" id="Lastname"
                                        placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
                                    <label htmlFor="Lastname">Last Name</label>
                                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                                </div> */}
                                <div className="form-floating">
                                    <input type="text" name="fullName" className="form-control" id="FullName"
                                        placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                                    <label htmlFor="fullName">Full Name</label>
                                    {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
                                </div>
                                {/* <div className="form-floating">
                                    <input type="text" name="mobile" className="form-control" id="mobile"
                                        placeholder="Mobile No." value={formData.mobile} onChange={handleChange} />
                                    <label htmlFor="mobile">Mobile No.</label>
                                    {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                                </div> */}
                                <div className="form-floating">
                                    <input type="password" name="signupPassword" className="form-control form-control-password"
                                        id="password" placeholder="Password" value={formData.signupPassword} onChange={handleChange} />
                                    <label htmlFor="password">Password</label>
                                    <i className="toggle-password bi bi-eye"></i>
                                    {errors.signupPassword && <p className="text-red-500 text-xs">{errors.signupPassword}</p>}
                                </div>
                                <button type="submit" className="btn-style-1 w-100" disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
                            </form>
                            <div className="forgot-password text-center mb-3">
                                <a href="">Forgot your password?</a>
                            </div>
                            <p className="or text-center mb-3">or</p>
                            <div className="platform-logins">
                                <a href="" className="login-btn mb-2"> <img
                                        src="assets/images/icons/facebook-color.svg" alt="" /> Continue with
                                    Facebook</a>
                                <a href="" className="login-btn mb-2"> <img
                                        src="assets/images/icons/google-color.svg" alt="" /> Continue with
                                    Google</a>
                                <a href="" className="login-btn"> <img src="assets/images/icons/apple-color.svg"
                                        alt="" />
                                    Continue with Apple</a>
                            </div> 
                            <div className="dont-have-ac text-center">
                                <p className="txt-1">Already have an account? 
                                  {/* <a href="login.html" className="text-midnight-navy">Log in here</a> */}
                                  <Link to={'/login'} className="text-midnight-navy">Log in here</Link>
                                </p>
                                <p className="txt-2">By continuing to use CoolTrails, you agree to our Terms of
                                    Service and Privacy Policy.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      </section>
  );
};

export default SignupForm;
