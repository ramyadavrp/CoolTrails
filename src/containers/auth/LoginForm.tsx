import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {validate,LoginFields,ErrorFields } from '../../utils/validation';
const BASE_URL = import.meta.env.VITE_API_URL;
import { useGoogleLogin, googleLogout} from '@react-oauth/google';
const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false); //
   // extract redirect URL if any
  const params = new URLSearchParams(location.search);
  const redirectUrl = params.get("redirect") || "/profile"; // default to profile
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [navigate]);
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/");
  }
}, [navigate]);

  
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorFields>({});
  const [serverError, setServerError] = useState("");
  // const [error, setError] = useState<string | null>(null);
  
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: ""
  });
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Google user api call info 
        const googleRes = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = googleRes.data;
        console.log("Google User:", userData);

        //Call API
        const apiRes = await axios.post("https://api.cooltrails.com/api/auth/external/login",
          {
            sub: userData.sub,
            name: userData.name,
            given_name: userData.given_name,
            family_name: userData.family_name,
            picture: userData.picture,
            email: userData.email,
            email_verified: userData.email_verified,
          }
        );

        const data = apiRes.data;
        console.log("Backend Response:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email); 
        localStorage.setItem("id", data.user.id); 
        localStorage.setItem("login", data.user.loginid);
        const expiry = data?.token_expiry 
              ? Number(data.token_expiry) 
              : Date.now() + (15 * 60 * 1000);
        localStorage.setItem("token_expiry", expiry.toString());
        // console.log('token get exp',expiry);
        // localStorage.setItem("token_expiry", data.token_expiry);
        sessionStorage.setItem("isActive", "true");
        // const token_expiry  = new Date().getTime() + (15 * 60 * 1000); // 1 hour
        // localStorage.setItem("token_expiry", token_expiry.toString());
        // localStorage.setItem("user", JSON.stringify(data.user));
        navigate(redirectUrl);

      } catch (error:any) {
        console.error("Login Error:", error?.response?.data || error.message);
      }
    },

    onError: () => {
      console.log("Google Login Failed");
    },
  });
  //   const login = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: {
  //         Authorization: `Bearer ${tokenResponse.access_token}`,
  //       },
  //     });
  //     const userData = await res.json();

  //     console.log("Google User:", userData);

  //     localStorage.setItem("email", userData.email);
  //     localStorage.setItem("name", userData.name);
  //     localStorage.setItem("token", tokenResponse.access_token);
  //     localStorage.setItem("id", userData.sub);
  //     navigate(redirectUrl);
  //   },
  //   onError: () => console.log("Login Failed"),
  // });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fields: LoginFields = { email, password };

    const validationErrors = validate(fields);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // stop login
    }

    setErrors({});
    setLoading(true);
    
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        Username: email,
        Password: password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const data = response.data;
      // console.log('login',data);
      if (data.status === "success") {
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email); 
        localStorage.setItem("id", data.user.id); 
        localStorage.setItem("login", data.user.loginid); 
        const expiry = data?.token_expiry 
              ? Number(data.token_expiry) 
              : Date.now() + (15 * 60 * 1000);
        localStorage.setItem("token_expiry", expiry.toString());
        // console.log('token get exp',expiry);
        sessionStorage.setItem("isActive", "true");
        // const token_expiry  = new Date().getTime() + (15 * 60 * 1000); // 1 hour
        // console.log("token_expiry:", token_expiry);
        // localStorage.setItem("token_expiry", token_expiry.toString());
        navigate(redirectUrl, { replace: true });
        // navigate('/profile');
      } else {
        setServerError(data.message || "Login failed");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Something went wrong.";
      setServerError(message);
    } finally {
      setLoading(false);
    }
  };
  
// console.log('BASE_URL',BASE_URL);

  const togglePasswordVisibility = () => {
      setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
      <section className="section-login py-3">
      <div className="container">
          <div className="row g-2">
              <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                  <div className="login-cover d-xl-block d-lg-block d-md-block d-sm-none d-none h-100">
                      <img src="assets/images/login/login-bg.jpg" alt="" className="w-100 h-100 br-20" />
                  </div>
              </div>
              <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                  <div className="login-container bg-almost-white br-20 h-100">
                      <h1 className="login-title text-center">Welcome ! <br /> Log in and start exploring.</h1>
                      <div className="login-form-container">
                          <form onSubmit={handleSubmit} className="login-form mb-4">
                            {serverError && <p  style={{color:'red',fontSize:'14px'}} className="server-error">{serverError}</p>}
                              <div className="form-floating">
                                  <input type="text" name="email" className="form-control" id="username"
                                      placeholder="name@example.com" value={email} onChange={(e) => {
                                        setEmail(e.target.value);
                                        setErrors({ ...errors, email: "" }); // clear error on typing
                                      }} />
                                  <label htmlFor="username">Email address</label>
                                  {errors.email && <p style={{color:'red',fontSize:'12px'}}  className="error">{errors.email}</p>}
                              </div>
                              <div className="form-floating">
                                  {/* <input type="password" name="password" className="form-control form-control-password"
                                      id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                                  <input
                                      // Conditionally set type based on showPassword state
                                      type={showPassword ? "text" : "password"} //
                                      name="password"
                                      className="form-control form-control-password"
                                      id="password"
                                      placeholder="Password"
                                      value={password}
                                      onChange={(e) => {
                                          setPassword(e.target.value);
                                          setErrors({ ...errors, password: "" });
                                        }}
                                  />
                                  <label htmlFor="password">Password</label>
                                  {errors.password && <p  style={{color:'red',fontSize:'12px'}} className="error">{errors.password}</p>}

      
                                  {/* <i className="toggle-password bi bi-eye"></i> */}
                                  <i className={`toggle-password bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                      onClick={togglePasswordVisibility} ></i>
                              </div>
                              <button type="submit" className="btn-style-1 w-100" disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
                          </form>
                         <p className="text-center">or</p>

                          <button
                            type="button"
                            onClick={() => login()}
                            className="btn-style-1 w-100"
                          >
                            <img src="assets/images/icons/google-color.svg" alt=""  style={{ marginRight: '10px' }} />
                              Continue with Google
                          </button>
                          <div className="forgot-password text-center mb-3">
                            <Link to={'/forgot-password'}>
                                  Forgot your password?
                            </Link>
                              {/* <a href="">Forgot your password?</a> */}
                          </div>
                          {/* <p className="or text-center mb-3">or</p>
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
                          </div> */}
                          <div className="dont-have-ac text-center">
                              <p className="txt-1">Don't have an account? 
                                {/* <a href="signup.html" className="text-midnight-navy">Sign up for free</a> */}
                                <Link to={'/signup'} className="text-midnight-navy">Sign up for free</Link>
                              </p>
                              <p className="txt-2">By continuing to use CoolTrails, you agree to our Terms of
                                  Service
                                  and Privacy Policy.</p>
                          </div>
                      </div>

                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};

export default LoginForm;
