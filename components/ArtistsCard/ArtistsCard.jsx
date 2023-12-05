import React, { useState } from 'react';
import css from './ArtistsCard.module.css';
import Image from 'next/image';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'; // Check the path

function ArtistsCard({ pic, singer }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={css.container}>
      <div className={css.container1}>
        <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
       
        <Image
          width={1000}
          height={1000}
          className={css.img}
          src={pic}
          alt='Album'
          onLoad={handleImageLoad}
         
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
        <div className={css.span1}>
          <h3>{singer}</h3>
        </div>
      </div>
    </div>
  );
}

export default ArtistsCard;
