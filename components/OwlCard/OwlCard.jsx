import React from 'react'
import css from "./OwlCard.module.css"
import Image from 'next/image'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


function OwlCard({img,singer,track,album}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  return (
    <div className={css.container}>
        <div className={css.container1}>
        <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
        <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} className={css.img} width={1000} height={1000}  src={img} alt='Recently'/>
        <div className={css.span1}>
            <h3 className={css.span1singer}>{singer}</h3>
            <h3 className={css.span1track}>{track}</h3>
            
            
            </div>
        </div>


    </div>
  )
}

export default OwlCard