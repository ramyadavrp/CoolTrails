import React from "react";
import { SquareLoader } from "react-spinners";
import CommonLoader from "../components/CommonLoader";

interface DataStateProps {
    loading: boolean;
    error?: string | null;
    isEmpty: boolean;
    emptyText?: string;
    children?: React.ReactNode; // ✅ ADD THIS
}

const DataStateLoading: React.FC<DataStateProps> = ({
    loading,
    error,
    isEmpty,
    emptyText = "No data found",
    children,
}) => {
    if (loading) {
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
                <CommonLoader/>
                {/* <SquareLoader color="#FC673C" size={80} speedMultiplier={1.5} /> */}
            </div>
        );
    }

    if (error) {
        return <p className="text-danger text-center w-100">{error}</p>;
    }

    if (isEmpty) {
        return <p className="text-center w-100" style={{marginBottom:'0px'}}>{emptyText}</p>;
    }

    // ✅ Render children when data exists
    return <>{children}</>;
};

export default DataStateLoading;
