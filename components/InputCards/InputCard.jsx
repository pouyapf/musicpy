import React from 'react';
import css from "./InputCard.module.css";
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import Link from 'next/link';

function InputCard({img, singer, albums,track }) {
  const linkHref = track ? `/Artists/${singer}/${albums}/${track}` : `/Artists/${singer}`;

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link href={linkHref} >
    <div className={css.container}>
      <div className={css.imgcont}>
      <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
        <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} width={1000} height={1000} className={css.img } alt='Singer' src={img} />
      </div>
      <div className={css.right}>
        <div><span>  {singer}</span></div>
      
      
       
        <div className={css.rightal}>
          
          <div> <span>{track}</span> </div><div><span className={css.alname}>{albums}
          </span> </div>
         
         
     
        </div>
      </div>
    </div></Link>
  );
}

export default InputCard;
