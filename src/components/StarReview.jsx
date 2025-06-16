"use client";

import { useEffect, useState } from "react";

// export default function StarReview({ newComment, setNewComment }) {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);

//   const handlClick = (stars) => {
//     setRating(stars);
//     setNewComment({ ...newComment, starsNumber: stars });
//     console.log("====================================");
//     console.log("new >> ", newComment);
//     console.log("====================================");
//   };

//   return (
//     <div className="flex  space-x-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <svg
//           key={star}
//           onClick={() => handlClick(star)}
//           onMouseEnter={() => setHover(star)}
//           onMouseLeave={() => setHover(0)}
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill={(hover || rating) >= star ? "#facc15" : "#e5e7eb"} // yellow if hovered or selected, gray otherwise
//           className="w-6 h-6 cursor-pointer transition-all"
//         >
//           <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ))}
//     </div>
//   );
// }

// import { useState } from "react";
export default function StarReview({
  initialRating,
  readOnly,
  newComment,
  setNewComment,
  updatedComment,
  setUpdatedComment,
  mode,
}) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(initialRating || 0);
  }, [initialRating]);

  const handleClick = (stars) => {
    if (readOnly) return;
    setRating(stars);
    if (mode === "update") {
      setUpdatedComment({ ...updatedComment, starsNumber: stars });
      console.log("updated comment ", updatedComment);

      return;
    }

    setNewComment({ ...newComment, starsNumber: stars });
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={(hover || rating) >= star ? "#facc15" : "#e5e7eb"}
          className={`w-6 h-6 transition-all cursor-${
            readOnly ? "default" : "pointer"
          }`}
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}
