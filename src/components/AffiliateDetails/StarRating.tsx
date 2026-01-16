import React from "react";

interface StarRatingProps {
  rating: number;
  max?: number; 
  
}

const StarRating: React.FC<StarRatingProps> = ({ rating ,max=5}) => {
  // const totalStars = 5;
  const validRating = Math.max(0, Math.min(max, Number(rating) || 0)); // Clamp rating between 0 and max
  const filledStars = Math.floor(validRating);
  const hasHalfStar = rating - filledStars >= 0.5;
  const emptyStars = max - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="rating">
      {[...Array(filledStars)].map((_, i) => (
        <i key={`filled-${i}`} className="bi bi-star-fill"></i>
      ))}
      {hasHalfStar && <i className="bi bi-star-half"></i>}
      {[...Array(emptyStars)].map((_, i) => (
        <i key={`empty-${i}`} className="bi bi-star"></i>
      ))}
    </div>
  );
};

export default StarRating; 
// import React from 'react';

// interface StarRatingProps {
//   rating: number; // Expect a number like 3.5 or 4
//   max?: number;   // Optional, default to 5
// }

// const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5 }) => {
//   const validRating = Math.max(0, Math.min(max, Number(rating) || 0)); // Clamp rating between 0 and max

//   const fullStars = Math.floor(validRating);
//   const halfStar = validRating % 1 >= 0.5 ? 1 : 0;
//   const emptyStars = max - fullStars - halfStar;

//   return (
//     <div className="star-rating d-flex">
//       {Array.from({ length: fullStars }).map((_, i) => (
//         <i key={`full-${i}`} className="fas fa-star text-warning" />
//       ))}
//       {halfStar === 1 && <i className="fas fa-star-half-alt text-warning" />}
//       {Array.from({ length: emptyStars }).map((_, i) => (
//         <i key={`empty-${i}`} className="far fa-star text-warning" />
//       ))}
//     </div>
//   );
// };

// export default StarRating;
