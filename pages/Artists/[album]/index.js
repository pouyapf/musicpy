import React from 'react'
import Navbar from '../../../components/Navbar/Navbar'
import css from "../../../styles/ArtistName.module.css"
import Image from 'next/image'
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner'

import AlbumCard from '../../../components/AlbumCard/AlbumCard'
import clientPromise from '../../../lib/mongodb'
import Link from 'next/link'
import { useState } from 'react'
import Head from 'next/head'
import {useRouter} from'next/router'


export async function getStaticProps(context) {
  const { params } = context;

  try {
      const client = await clientPromise;
      const db = client.db("music");

      // Fetch filtered data
      const data = await db
          .collection("artists")
          .findOne({ singer: params.album });

      // Fetch all data
      const allData = await db
          .collection("artists")
          .find()
          .toArray();

      return {
          props: {
              data: JSON.parse(JSON.stringify(data)),
              allData: JSON.parse(JSON.stringify(allData)),
          },
          revalidate: 60,
      };
  } catch (e) {
      console.error(e);
  }
}
  

  export async function getStaticPaths() {
    try {
      const client = await clientPromise; // Ensure you have the MongoDB client instance
      const db = client.db("music");
  
      const response = await db
        .collection("artists")
        .find({})
        .toArray();
  

  
      const paths = response.map(post => ({
        params: {
          album: `${post?.singer}`,
        }
      }));

  
      return {
        paths,
        fallback: true
      };
    } catch (e) {
      console.error("Error in getStaticPaths:", e);
      throw e; // You might want to throw the error to provide better feedback
    }
  }
  

 




function ArtistName({data,allData}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const [mainimg, setmainimg] = useState(data?.img);
  const handleImageClick = (clickedImage) => {
    setmainimg(clickedImage);
  };
  const router1=useRouter()
if(router1.isFallback){  
  return<h1>Page Is Loading...</h1>
}
   
  return (<div>
    <Navbar data={allData} place={"Enter Artist Name Or Track Name:"}/>
    <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="keywords" content={`${data?.singer}, music, downlaod,free,freedownload,top tracks, Your Music Platform`} />
  <title>{data?.singer}s Musics - Musicpy</title>
  <meta name="description" content={`Explore ,Streaming,Download the music of ${data?.singer} on Musicpy. Listen to their top tracks, albums, and latest releases.`} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": `${data?.singer}`,
    "description": `Explore ,Streaming,Download the music of ${data?.singer} on Musicpy. Listen to their top tracks, albums, and latest releases.`
  }) }} />
</Head>

    <div className={css.container}>
        <div className={css.container1}>
        <h1 style={{ display: "none" }}>Free Download and listen to {data?.singer},s songs </h1>
            
            <div className={css.imgcont}>
            <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
                    <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} width={1000} height={1000} className={css.img} alt='Singer' src={mainimg}/>
                    <div className={css.name}><h3>{data?.singer}</h3>
                    <h3>{data?.genre}</h3></div>
                    
                
            </div>
            <div className={css.piccont}>


            {
              data?.img2?.map((i,k)=>(
                <div  key={k} className={css.pic}>
                  <div key={k}  className={css.img3}>
                    
                  <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
                    <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} key={k} alt='Singer_photo' onClick={() => handleImageClick(i)} width={1000} height={1000} className={css.img2} src={i}/></div>
                
                </div>

              ))
            }

              
            </div>
            <div className={css.bio}>
                <p>{data?.bio}</p>
            </div>
            <div className={css.albumcont}>
            {data?.all?.map((i, k) => (
  <div className={css.album1} key={k}>
    <Link href={`${data?.singer}/${i?.album_name}`}>
    <AlbumCard pic={i?.album_img.length > 5 ? i?.album_img : data?.img} album={i?.album_name} />

    </Link>
  </div>
))}


  
                
            
            </div>





        </div>


    </div>
    
    
    
    </div>)
    
  
}

export default ArtistName