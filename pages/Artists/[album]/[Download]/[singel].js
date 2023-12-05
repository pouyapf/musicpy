import React from 'react'
import Navbar from '../../../../components/Navbar/Navbar'
import css from "../../../../styles/singel.module.css"
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'

import Image from 'next/image'
import Links from '../../../../components/Links/Links'
import clientPromise from '../../../../lib/mongodb'
import {useRouter} from'next/router'
import Head from 'next/head'
import { useState } from 'react'
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
          revalidate: 90,
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
  
      const paths = response.reduce((accumulator, artist) => {
        const songPaths = artist.all.flatMap((album) => {
          return album.songs.map((song) => ({
            params: {
              album: artist.singer,
              Download: album.album_name,
              singel: song.songname,
            },
          }));
        });
  
        return accumulator.concat(songPaths);
      }, []);
  
      return {
        paths,
        fallback: true,
      };
    } catch (e) {
      console.error("Error in getStaticPaths:", e);
      throw e;
    }
  }
  
  






function Singel({data,allData}) {
  const [imageLoaded, setImageLoaded] = useState(false);

const handleImageLoad = () => {
  setImageLoaded(true);
};
  const router = useRouter();
  const track = router.query.singel;
  const alb = router.query.Download;
  const router1=useRouter()
if(router1.isFallback){  
  return<h1>Page Is Loading...</h1>
}

 
   

  return (
    <div>
        <Navbar data={allData} />
        <div className={css.container}>
            <div className={css.container1}>
                {data?.all?.map((i,k)=>{if(i?.album_name===alb){ return <div key={k} className={css.imgcont}>
                <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
                  <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} alt={i?.singer} className={css.img} width={700} height={700} src={i?.album_img.length > 5 ? i?.album_img : data?.img} album={i?.album_name} /></div> } return null;})}
                <div className={css.desc}>
                {data?.all?.map((i, k) =>i?.songs?.map((j, l) => {if (j?.songname === track) { return <p key={k}>{j?.desc}</p>;}return null;}))}</div>
                <div className={css.lyr}>
                {data?.all?.map((i, k) =>i?.songs?.map((j, l) => {if (j?.songname === track) { return <p key={k}>{j?.lyr}</p>;}return null;}))}</div>
                {data?.all?.map((i, k) =>i?.songs?.map((j, l) => {if (j?.songname === track) { return<div key={k} className={css.audcont}>
                <h1 style={{ display: "none" }}>Free Download And listen to {j?.songname}  {data?.singer} </h1>
                <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{data?.singer}-{i?.album_name}-{j?.songname}- Musicpy</title>
  <meta name="description" content={`${j?.desc}`} />
  <meta name="keywords" content={`${data?.singer},${i?.album_name},${j?.songname}, music, top tracks, Your Music Platform,musicpy,free,freedownload`} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": `${data?.singer}`,
    "description": `${j?.desc}`
  }) }} />
</Head>
                  
                  
                   <Links key={l} songname={j?.songname} inlinksinger={data?.singer} inlinkal={i?.album_name} inlinkname={j?.songname} link={j?.link} /></div>;}return null;}))}


                
       


            </div>



        </div>






    </div>
  )
}

export default Singel