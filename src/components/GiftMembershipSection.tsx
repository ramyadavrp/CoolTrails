import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import data from '../data/community.json';
import { Link } from 'react-router-dom';

import { SquareLoader } from "react-spinners"; 

interface Plans {
  Plan_name?: string;
  currency?: string;
  monthly_amt?: number | string; // JSON gave "9.17" as string
  total_amt?: number | string;
}

interface FAQ {
  faq_name?: string;
  faq_description?: string;
}

interface GiftMembershipData {
  FAQ: FAQ[];
  plans: Plans[] | Plans;
}
const GiftMembershipSection: React.FC = () => {
    const [loadingGiftMembership,setLoadingGiftMembership] = useState(true);
    const [getGiftMembership, setGiftMembership ]= useState<FAQ[]>([]);
    const [getAnnualPlans, setAnnualPlans ]= useState<Plans[]>([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(()=>{
        const timer = setTimeout(()=>
            setLoadingGiftMembership(false),6000);
        return()=>clearTimeout(timer);
    },[]);
    useEffect(() => {
        const fetchGiftMembership = async () => {
            try {
            const response = await fetch('/data/giftMembership.json');
            const json: GiftMembershipData = await response.json();

            const plans = Array.isArray(json.plans) ? json.plans : [json.plans];

            setGiftMembership(json.FAQ);
            setAnnualPlans(plans);
            } catch (error) {
            console.error('Error fetching JSON:', error);
            } finally {
            setLoadingGiftMembership(false);
            }
        };

        fetchGiftMembership();
    }, []);
    if (loadingGiftMembership) {
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
    // console.log(getAnnualPlans);
    return (
    <main className="mainContent">
        <section className="section-gift-inner position-relative overflow-hidden">
            <div className="container position-relative z-1">
                <div className="row">
                    <div className="col-12">
                        <div className="cooltrails-title text-center">
                        <h1 className="title">Give The <span>Gift of Adventurekk</span></h1> 
                    </div>
                        <ul className="list-unstyled list-with-icon list-with-icon-with-bg mx-auto">
                            <li>  <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 1L6 12L1 7" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>

                                Downloadable offline maps</li>
                            <li> <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 1L6 12L1 7" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>
                                Real-time GPS navigation</li>
                            <li> <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 1L6 12L1 7" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>
                                Exclusive trails and features</li>
                            <li> <svg width="18" height="13" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M17 1L6 12L1 7" stroke="#717171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/> </svg>
                                Ad-free exploring</li>
                        </ul>
                        <div className="annual-plan bg-almost-white br-20 d-flex align-items-center mx-auto">
                            {
                               getAnnualPlans.map((annual,index)=>(
                                    <div className="annp-cn" key={index}>
                                        <p className="mb-0 text-grey">{annual.Plan_name ?? ''} plan</p>
                                        <h2 className="mb-0 text-midnight-navy anp-amt">{annual.currency ?? ''} {annual.monthly_amt ?? ''}/month</h2>
                                        <p className="mb-0 text-grey">billed once at {annual.currency ?? ''} {annual.total_amt ?? ''}</p>
                                    </div>
                                ))
                            }
                            
                            <div className="annp-ctrl">
                                <Link className="btn-style-1" to={'/gift/customize'}>
                                    Buy Gift                                                                   
                                </Link>
                                {/* <a href="" className="btn-style-1">Buy Gift</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <img src="assets/images/home/card.png" alt="" className="abs-gc-left" />
            <img src="assets/images/home/card.png" alt="" className="abs-gc-right" />
        </section>

        <section className="section-give-instantly default-padding"> 
         <div className="container">
               <div className="row justify-content-center">
                <div className="col-12">
                    <div className="gift-content-blue-box bg-skyblue br-20">
                            <div className="row">
                                <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                                    <div className="gcb-image">
                                        <img src="assets/images/bg/bg-scenic.jpg" alt="" className="w-100 br-20" />
                                    </div>
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                                    <div className="gcb-content">
                                        <h2 className="text-almost-white">Give Instantly. <br /> Adventure Forever.</h2>
                                         <div className="d-flex gcb-points align-items-center">
                                            <div className="dcb-icon">
                                                <img src="assets/images/icons/power.svg" alt="" />
                                            </div>
                                            <div className="dcb-point-dt">
                                                <p className="mb-0">Instant digital delivery</p>
                                              <p className="mb-0">No wrapping needed</p>
                                            </div>
                                         </div>
                                         <div className="d-flex gcb-points align-items-center">
                                            <div className="dcb-icon">
                                            <img src="assets/images/icons/Business.svg" alt="" />
                                            </div>
                                            <div className="dcb-point-dt">
                                                <p className="mb-0">1-Year Membership</p>
                                                <p className="mb-0">Full access for 12 months</p>
                                            </div>
                                         </div>
                                         <div className="d-flex gcb-points align-items-center">
                                            <div className="dcb-icon">
                                            <img src="assets/images/icons/cycle.svg" alt="" />
                                            </div>
                                            <div className="dcb-point-dt">
                                                <p className="mb-0">Perfect for anyone</p>
                                               <p className="mb-0">Hikers, bikers, campers, travelers</p>
                                            </div>
                                         </div>
                                         <div className="d-flex gcb-points align-items-center">
                                            <div className="dcb-icon">
                                            <img src="assets/images/icons/Union-1.svg" alt="" />
                                            </div>
                                            <div className="dcb-point-dt">
                                                <p className="mb-0">No auto-renewal</p>
                                                <p className="mb-0">One-time gift, no surprises</p>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
         </div>
        </section>
        <section className="section-faq default-padding">
            <div className="container">
                 <div className="row">
                <div className="col-12">
                    <div className="cooltrails-title text-center">
                        <h2 className="title title-sm">Frequently asked questions</h2> 
                    </div>
                    
                </div>
            </div>  
                <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-10 col-md-11 col-sm-12 col-12">
                        <div className="accordion accordion-flush faq-accordion" id="faqToggle">
                        {
                            getGiftMembership.length > 0 ? (
                                getGiftMembership.map((memb:any,index:number)=>(
                                    <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#faq${index}`} aria-expanded="false" aria-controls={`faq${index}`}>
                                        {memb.faq_name ?? ''}
                                        </button>
                                        </h2>
                                        <div id={`faq${index}`} className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                                        <div className="accordion-body">{memb.faq_description ?? ''}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Not Found...</p>
                            )
                        }
                    
                        {/* <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2" aria-expanded="false" aria-controls="faq2">
                                Can I give a subscription to someone who already has a account?
                            </button>
                            </h2>
                            <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                            <div className="accordion-body">If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient needs to redeem it. <code>.accordion-flush</code> class. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3" aria-expanded="false" aria-controls="faq3">
                            Will I know if my recipient receives their gift?
                            </button>
                            </h2>
                            <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                            <div className="accordion-body">If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient needs to redeem it.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq33" aria-expanded="false" aria-controls="faq33">
                            The subscription I sent wasn’t received?
                            </button>
                            </h2>
                            <div id="faq33" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                            <div className="accordion-body">If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient needs to redeem it.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4" aria-expanded="false" aria-controls="faq4">
                                Is there an expiration date on the subscription?
                            </button>
                            </h2>
                            <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                            <div className="accordion-body">If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient needs to redeem it.</div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5" aria-expanded="false" aria-controls="faq5">
                            Can I buy a physical gift subscription?
                            </button>
                            </h2>
                            <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqToggle">
                            <div className="accordion-body">If you don't want your gift delivered by email, you'll have the option to print instead. Then you can deliver your gift by hand or by mail and the PDF will include all the information your recipient needs to redeem it.</div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </section> 
        <section className="section-ready-to-gift default-padding">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="ready-to-gift br-20 bg-image position-relative overflow-hidden">
                            <div className="rtg-content text-center">
                                <h2 className="text-almost-white">Ready to Gift?</h2>
                                <p className="text-white mb-3">Surprise someone with the outdoors, wherever they are.</p>
                                <a href="#" className="btn-style-1">Send  Gift Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
};

export default GiftMembershipSection;
