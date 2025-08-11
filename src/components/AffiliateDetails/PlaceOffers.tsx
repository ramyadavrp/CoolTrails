import React from "react";

interface Offer {
  placeName: string;
  description: string;
  imagePath: string;
}

interface PlaceOffersProps {
  getPlaceOffer: Offer[];
}

const PlaceOffers: React.FC<PlaceOffersProps> = ({ getPlaceOffer }) => {
    return (
        <ul className="trail-side-nav list-unstyled mt-0">
                               
            {
                getPlaceOffer.length > 0 ?(
                    getPlaceOffer.map((offer:any,index:number)=>(
                        <li key={index}>
                            <a href="">
                                <img src={offer.imagePath} alt="" /> 
                                {offer.placeName ?? 'N/A'} 
                            </a>
                        </li>
                    ))
                ) :(
                    <p>Not Available..</p>
                )
            }
            
        </ul>
    );    
};

export default PlaceOffers; 
