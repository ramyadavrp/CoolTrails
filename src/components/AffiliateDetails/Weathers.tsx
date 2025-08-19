import React from "react";

interface weather {
  dayOfWeek: string;
  date: string;
  avgTemp: number;
  icon: string;
  high: number;
  low: number;
  precipitation: number;
  humidity: number;
  wind: number;
}

interface WeathersProps {
  getweatherDays: weather[];
}

const Weathers: React.FC<WeathersProps> = ({ getweatherDays }) => {
    return (
        <div className="position-relative weather-widget">
                                       
            <ul className="nav nav-pills weather-nav-pills" id="pills-tab" role="tablist">
                {
                    getweatherDays && getweatherDays.length > 0 ? (
                            getweatherDays.map((weatherData:any,index:number)=>(

                            <li key= {index} className="nav-item" role="presentation">
                                <button className={`weather-nav-btn ${index === 0 ? 'active' : ''}`}
                                id={`day-${index}-tab`} data-bs-toggle="pill"
                                data-bs-target={`#day-${index}`} type="button" role="tab"
                                aria-controls={`day-${index}`} aria-selected={index=== 0 ? "true" : "false"} >
                                    <span className="day">{weatherData.dayOfWeek ||"Mon"}</span>
                                    <span className="date">{weatherData.date ? new Date(weatherData.date).getDate() : "19"}
                                    </span>
                                </button>
                            </li>     
                        ))
                    ) : (
                        <p>No weather Day available</p>
                    )
                }
            </ul>
            <div className="tab-content weather-widget-tab" id="pills-tabContent">
                
                {
                getweatherDays && getweatherDays.length>0 ? (
                    getweatherDays.map((weatherData:any,index:number)=>(
                    <div key= {index}  className={`tab-pane fade ${index === 0 ? "show active" : ""}`} 
                        id={`day-${index}`} role="tabpanel" 
                        aria-labelledby={`day-${index}-tab`} tabIndex={0}>
                    
                        <div className="d-flex weather-widget-inner justify-content-between position-relative z-1">
                            <div className="weather-widget-left">
                                <div className="temparature d-flex">
                                    <h3 className="mb-0 me-3">{ weatherData.avgTemp || "29°" }</h3>
                                    {/* <img src="assets/images/icons/sun.svg" alt="" /> */}
                                    <img
                                    src={weatherData.icon || '/assets/images/not-found.jpg'}
                                    alt="Weather" 
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        const target = e.currentTarget;
                                        target.onerror = null; // prevent infinite loop
                                        target.src = '/assets/images/not-found.jpg'; // fallback image
                                    }}
                                    />
                                </div>
                                <p className="mb-0 text-almost-white">
                                    Clear <br />
                                    H: { weatherData.high || "45°" } L: { weatherData.low || "27°" }
                                </p>
                            </div>
                            <div className="weather-widget-right text-end">
                                <p className="mb-0 text-almost-white">
                                    Precipitation: { weatherData.precipitation || 0 }% <br />
                                    Humidity:  { weatherData.humidity || 57 }%<br />
                                    Wind: { weatherData.wind || 6 }km/h
                                </p>
                            </div>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>No weather data available</p>
                )
                    
                }
                    
            </div>
                
        </div>
    );    
};

export default Weathers; 
