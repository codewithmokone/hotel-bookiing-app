import React from 'react'

function StarRating({rating}) {

    const stars = [];
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
        if (i <= rating) {
            stars.push(<span style={{color: '#0088a9'}} key={i}>&#9733;</span>); // Full star
        } else {
            stars.push(<span style={{color: '#0088a9'}} key={i}>&#9734;</span>); // Empty star
        }
    }


    return (
        <div>
            {stars}
        </div>
    )
}

export default StarRating
