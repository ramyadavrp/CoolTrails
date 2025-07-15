import axios from 'axios';
import { useState, useEffect } from "react";
import { Link, useNavigate, } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL;

const LoginForm = () => {
  const navigate = useNavigate();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false); //
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        Username: email,
        Password: password,
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const data = response.data;
      console.log(data);
      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        navigate('/profile');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

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
                            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
                              <div className="form-floating">
                                  <input type="text" name="email" className="form-control" id="username"
                                      placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                  <label htmlFor="username">Email address</label>
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
                                      onChange={(e) => setPassword(e.target.value)}
                                  />
                                  <label htmlFor="password">Password</label>
                                  {/* <i className="toggle-password bi bi-eye"></i> */}
                                  <i className={`toggle-password bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                                      onClick={togglePasswordVisibility} ></i>
                              </div>
                              <button type="submit" className="btn-style-1 w-100" disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
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
