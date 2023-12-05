import React from 'react'
import css from "./NewsCard.module.css"
import Image from 'next/image'
import { useState } from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'


function NewsCard({img,title,decs}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div>  <div className={css.container1}>
    <div className={css.imgcont}>
    <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
      
      <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} className={css.img} alt={title} width={1000} height={1000} src={img}/></div>
    <div className={css.tit}>
        <h2>{title}</h2></div>
    <div className={css.decs}><p>{decs}</p></div>
</div></div>
  )
}

export default NewsCard