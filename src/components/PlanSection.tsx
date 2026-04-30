import React, { useState ,useEffect} from "react";
import { SquareLoader } from "react-spinners";

const PlanSection = () => {
    const [selectedPlan, setSelectedPlan] = useState("plus");
    const [loadingPlans,setloadingPlans] = useState(true);
    const features = [
        { label: "Save trails and create lists", base: true, plus: true, peak: true },
        { label: "Navigate to stay on route", base: true, plus: true, peak: true },
        { label: "Download offline maps", base: false, plus: true, peak: true },
        { label: "Plan for on-trail conditions", base: false, plus: true, peak: true },
        { label: "Tour photos along the trail", base: false, plus: true, peak: true },
        { label: "Get alerts for wrong turns", base: false, plus: true, peak: true },
        { label: "Preview trails in 3D", base: false, plus: true, peak: true },
        { label: "Share live activities", base: false, plus: true, peak: true },
        { label: "Find trails by distance", base: false, plus: true, peak: true },
        { label: "Print maps for backup", base: false, plus: true, peak: true },
        { label: "Go ad-free", base: false, plus: true, peak: true },
        { label: "Explore community heatmaps", base: false, plus: false, peak: true },
        { label: "Build your own routes", base: false, plus: false, peak: true },
        { label: "Identify plants and more", base: false, plus: false, peak: true },
    ];
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // if (loadingPlans) {
    //         return (
    //             <div
    //                 style={{
    //                 position: "fixed",
    //                 top: 0,
    //                 left: 0,
    //                 width: "100vw",
    //                 height: "100vh",
    //                 background: "#FFF5E9",
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "center",
    //                 zIndex: 9999,
    //                 }}
    //             >
    //                 <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} />
    //             </div>
    //         );
    //     }
    return (
        <main className="mainContent">
            <section className="section">
                <div className="container" style={{ padding: "40px 0" ,
                        marginTop: "40px",
                        background: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
                    }}>
                    <div className="row">
                        {/* LEFT SIDE – PLANS */}
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div style={{ padding: "30px", margin: "auto" }}>

                                <h2 style={{ marginBottom: "25px", fontWeight: 700 }}>Your first week's on us</h2>

                                {/* Plans Wrapper */}
                                <div style={{ marginBottom: "35px" }}>

                                    {/* PLUS PLAN */}
                                    <div
                                        onClick={() => setSelectedPlan("plus")}
                                        style={{
                                            padding: "22px",
                                            borderRadius: "16px",
                                            marginBottom: "20px",
                                            border: selectedPlan === "plus" ? "2px solid #05073D" : "1px solid #ddd",
                                            cursor: "pointer",
                                            background: selectedPlan === "plus" ? "#E9F0FF" : "#fff",
                                            boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <h3 style={{ marginBottom: "8px" }}>Plus</h3>
                                        <p style={{ marginBottom: "8px", color: "#555" }}>
                                            Offline maps, trail conditions, and more
                                        </p>
                                        <p style={{ marginBottom: "0px", fontSize: "15px", color: "#333" }}>
                                            7 days free, then ₹989.00/year
                                            <br />
                                            <strong>(₹83.25/month)</strong>
                                        </p>
                                    </div>

                                    {/* PEAK PLAN */}
                                    <div
                                        onClick={() => setSelectedPlan("peak")}
                                        style={{
                                            padding: "22px",
                                            borderRadius: "16px",
                                            border: selectedPlan === "peak" ? "2px solid #05073D" : "1px solid #ddd",
                                            cursor: "pointer",
                                            background: selectedPlan === "peak" ? "#E9F0FF" : "#fff",
                                            boxShadow: "0px 3px 10px rgba(0,0,0,0.06)",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <h3 style={{ marginBottom: "8px" }}>Peak</h3>
                                        <p style={{ marginBottom: "8px", color: "#555" }}>
                                            Plant identifier, community heatmaps, and more
                                        </p>
                                        <p style={{ marginBottom: "8px", fontSize: "15px", color: "#333" }}>
                                            7 days free, then ₹2199.00/year
                                            <br />
                                            <strong>(₹183.25/month)</strong>
                                        </p>

                                        <span style={{
                                            fontSize: "12px",
                                            padding: "5px 10px",
                                            background: "#f0f0f0",
                                            borderRadius: "8px",
                                            display: "inline-block",
                                        }}>
                                            Includes Plus benefits
                                        </span>
                                    </div>
                                </div>
                                <div style={{textAlign:'center'}}>
                                <button
                                    style={{
                                        padding: "12px 30px",
                                        fontSize: "17px",
                                        borderRadius: "30px",
                                        background: "#05073D",
                                        color: "#fff",
                                        cursor: "pointer",
                                        border: "none",
                                        fontWeight: 600,
                                        marginBottom: "20px",
                                    }}
                                >
                                    Start your free trial
                                </button>

                                <p style={{ color: "#666", fontSize: "14px", textAlign: "center" }}>Cancel anytime</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE – COMPARISON TABLE */}
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div style={{ padding: "30px", margin: "auto" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ background: "#F5F5F5" }}>
                                            <th style={{ padding: "12px", fontWeight: 600 }}>What you get</th>
                                            <th style={{ padding: "12px", textAlign: "center" }}>Base</th>
                                            <th style={{ padding: "12px", textAlign: "center" }}>Plus</th>
                                            <th style={{ padding: "12px", textAlign: "center" }}>Peak</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {features.map((f, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                                                <td style={{ padding: "12px" }}>{f.label}</td>
                                                <td style={{ textAlign: "center" }}>{f.base ? "✔️" : ""}</td>
                                                <td style={{ textAlign: "center" }}>{f.plus ? "✔️" : ""}</td>
                                                <td style={{ textAlign: "center" }}>{f.peak ? "✔️" : ""}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PlanSection;
