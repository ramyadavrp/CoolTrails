// src/components/HomeTrails.tsx
import React, { useState }  from 'react';

const LoginSection: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);
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
                          <form action="" className="login-form mb-4">
                              <div className="form-floating">
                                  <input type="email" className="form-control" id="username"
                                      placeholder="name@example.com" />
                                  <label htmlFor="username">Email address</label>
                              </div>
                              <div className="form-floating">
                                  <input type="password" className="form-control form-control-password"
                                      id="password" placeholder="Password" />
                                  <label htmlFor="password">Password</label>
                                  <i className="toggle-password bi bi-eye"></i>
                              </div>
                              <button type="submit" className="btn-style-1 w-100">Log in</button>
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
                              <p className="txt-1">Don't have an account? <a href="signup.html"
                                      className="text-midnight-navy">Sign
                                      up for free</a></p>
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

export default LoginSection;
