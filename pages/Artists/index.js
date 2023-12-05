import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import ArtistsCard from '../../components/ArtistsCard/ArtistsCard'
import css from "../../styles/Artists.module.css"
import Pagination from '../../components/pagination/Pagination'
import { useState } from 'react'
import clientPromise from '../../lib/mongodb'
import Link from 'next/link'
import { useEffect } from 'react'
import Head from 'next/head'

import {useRouter} from'next/router'


export async function getStaticProps() {
  try {
      const client = await clientPromise;
      const db = client.db("music");

      const data = await db
          .collection("artists")
          .find({})
          .sort({ timestamp: -1 }) 
          .toArray();

      return {
          props: { data: JSON.parse(JSON.stringify(data)) },revalidate:120,
      };
  } catch (e) {
      console.error(e);
  }
}



function Index({data}) {

  const [blogList, setblogList] = useState(data);
  const [suggestions, setSuggestions] = useState(data);

  function HandleInputChange(e) {
    const input = e.target.value;  
   if(input?.length>=2){
      
  
      
    const filteredSuggestions = blogList.filter(task =>
      task?.singer?.toLowerCase().includes(input?.toLowerCase()));
  
    setSuggestions(filteredSuggestions);
  }else{setSuggestions(blogList)}

 
   }

   suggestions?.sort((a, b) => {
    const timestampA = parseInt(a._id.toString(16).substring(0, 8), 16);
    const timestampB = parseInt(b._id.toString(16).substring(0, 8), 16);
    return timestampB - timestampA; // Reverse the order by subtracting timestampB from timestampA
  });


  const [itemsToShow, setItemsToShow] = useState(6);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;

    // Calculate how far the user is from the bottom
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    // Adjust the threshold as needed
    const threshold = 100;

    // If the user is close to the bottom, show the "Load More" button
    setShowLoadMore(distanceFromBottom < threshold);
  };

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 6);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemsToShow]);

  const router1=useRouter()
if(router1.isFallback){  
  return<h1>Page Is Loading...</h1>
}
  return (

    
    
    <div className={css.container1}>
        <h1 style={{ display: "none" }}>Explore Talented Singers</h1>

      <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Explore Talented Singers - Musicpy</title>
  <meta name="description" content="Discover a diverse array of talented singers on Musicpy. Explore their unique voices, discographies, and latest releases." />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Singers Platform",
    "description": "Discover a diverse array of talented singers on Musicpy. Explore their unique voices, discographies, and latest releases."
  }) }} />
</Head>

        <Navbar data={data} place={"Artist Name:"}/>
        <div className={css.incont}> <input onChange={HandleInputChange} placeholder='Find your favorite singers here...' className={css.in} /></div>
       
        <div className={css.container}>
          
          {
            suggestions?.slice(0, itemsToShow).map((i,k)=>(
              <Link key={k} href={`Artists/${i?.singer}`}>
              <ArtistsCard pic={i?.img} key={k}  singer={i?.singer}/></Link>

            ))


          }
 {
            suggestions?.length ===0 ? (<div className={css.notfound}><span>Sorry cant Find That</span></div>):("")
          }

     
        </div>
       
      
        {itemsToShow < suggestions?.length && (
       <div className={css.butcont}> <span className={css.but} onClick={handleLoadMore}>More Singers...</span></div>
       
      )}
    </div>
  )
}

export default Index