import React from 'react'
import css from "./OwlCard2.module.css"
import AudioPlayer from '../Player/Player'
import Image from 'next/image'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

import Link from 'next/link'

function OwlCard2({img,Singer,Track,link,album}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div className={css.container}>
        <div className={css.imgcont}>
        <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
          <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} width={1000} height={1000} alt='Trending' className={css.img} 
         src={img}/></div>
        <div className={css.detail}>
          <div className={css.detail_name}>
          <Link href={`/Artists/${Singer}`}>
            <h3 className={css.detail_singer}>{Singer}</h3></Link>
            <Link href={`/Artists/${Singer}/${album}/${Track}`}>  <h3 className={css.detail_track}>{Track}</h3></Link>
          </div>
          <div className={css.aud}> <AudioPlayer link={link}/></div>
         
            


        </div>



    </div>
  )
}

export default OwlCard2