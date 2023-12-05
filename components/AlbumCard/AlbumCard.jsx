import css from "./AlbumCard.module.css"
import Image from 'next/image'
import React from "react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { useState } from "react"

function AlbumCard({pic,album}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={css.container}>
        <div className={css.container1}>
        <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
        <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }}  className={css.img} width={1000} height={1000} src={pic} alt='Album'/>
        <div className={css.span1}>
            <h3>{album}</h3>
           
            
            
            </div>
        </div>


    </div>
  )
}

export default AlbumCard