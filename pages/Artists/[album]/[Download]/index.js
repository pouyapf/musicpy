import React from 'react'
import css from "../../../../styles/Download.module.css"
import Navbar from '../../../../components/Navbar/Navbar'
import Image from 'next/image'
import { useState } from 'react'


import Links from '../../../../components/Links/Links'
import clientPromise from '../../../../lib/mongodb'
import {useRouter} from'next/router'
import Head from 'next/head'
import LoadingSpinner from '../../../../components/LoadingSpinner/LoadingSpinner'


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
          revalidate: 50,
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
      const albumPaths = artist.all.map((album) => ({
        params: {
          album: artist.singer, // Assuming the singer's name is in the artist's data
          Download: album.album_name,
        },
      }));

      return accumulator.concat(albumPaths);
    }, []);

   

    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error("Error in getStaticPaths:", e);
    throw e; // You might want to throw the error to provide better feedback
  }
}






function Downlaod1({data,allData}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const router = useRouter();
  const alb = router.query.Download;

 
  const router1=useRouter()
if(router1.isFallback){  
  return<h1>Page Is Loading...</h1>
}


  return (
    <div >
 


    <Navbar data={allData} place={"Enter Artist Name Or Track Name:"}/>
    <div className={css.container}>
    <div className={css.container1}>
      <div className={css.imgcont}>
      <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
        <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} alt='Singer' className={css.img} width={1000} height={1000} src={data?.img}/>
        

        {
  data?.all?.map((i, k) => {
    if (i?.album_name === alb) {
    
      <h1 style={{ display: "none" }}>Free Download And listen to {i?.album_name}-{data?.singer} </h1>
      return <div key={k} className={css.pacont}> <p key={k} className={css.pa}> 
      <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{data?.singer}-{i?.album_name}- Musicpy</title>
  <meta name="description" content={i?.desc} />
  <meta name="keywords" content={`${data?.singer},${i?.album_name}, music, downlaod,free,freedownload,top tracks, Your Music Platform`} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": `${data?.singer}`,
    "description": `${i?.desc}`
  }) }} />
</Head>

      
      {i?.desc}</p></div> 
      ;
    }
    return null; // Return null if there is no match
  })
}


       
        
        
        </div>
      <div className={css.downbox}>
        <div className={css.names}>
          <h2>{data?.singer}</h2>
          <h2>{alb}</h2>
        </div>
        <div className={css.links}>
      
      
        {
  data?.all?.map((i, k) => {
    if (i?.album_name === alb) {
      return i?.songs?.map((j, l) => (
       
      
        <Links key={l} songname={j?.songname} inlinksinger={data?.singer} inlinkal={i?.album_name} inlinkname={j?.songname} link={j?.link}/>
      ));
    }
    return null; // Return null if there is no match
  })
}

        </div>


      </div>
      </div>



    </div></div>
  )
}

export default Downlaod1