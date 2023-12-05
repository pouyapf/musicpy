import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Blogcard from '../../components/blogcard/Blogcard'
import css from "../../styles/blog.module.css"
import { useState } from 'react'

import Link from 'next/link'
import { useEffect } from 'react'
import { MongoClient } from 'mongodb'
import Head from 'next/head'
import {useRouter} from 'next/router';
export async function getStaticProps() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Fetch data from the "music" database
    const musicDb = client.db("music");
    const artistsData = await musicDb
      .collection("artists")
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Fetch data from the "blog" database
    const blogDb = client.db("blog");
    const blogData = await blogDb
      .collection("blogid")
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    // Close the MongoDB connection
    await client.close();

    return {
      props: {
        artistsData: JSON.parse(JSON.stringify(artistsData)),
        blogData: JSON.parse(JSON.stringify(blogData)),
      },
      // Re-generate the page every 60 seconds (1 minute)
      revalidate: 60,
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        artistsData: [],
        blogData: [],
      },
    };
  }
}

function Index({blogData,artistsData}) {

  const [blogList, setblogList] = useState(blogData);
  const [suggestions, setSuggestions] = useState(blogData);

  function HandleInputChange(e) {
    const input = e.target.value;  
   if(input?.length>=2){
      
  
      
    const filteredSuggestions = blogList?.filter(task =>
      task?.title?.toLowerCase().includes(input?.toLowerCase()));
  
    setSuggestions(filteredSuggestions);
  }else{setSuggestions(blogList)}

 
   }

   blogData?.sort((a, b) => {
    const timestampA = parseInt(a._id.toString(16).substring(0, 8), 16);
    const timestampB = parseInt(b._id.toString(16).substring(0, 8), 16);
    return timestampB - timestampA; // Reverse the order by subtracting timestampB from timestampA
  });


  const [itemsToShow, setItemsToShow] = useState(4);
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
    setItemsToShow(itemsToShow + 4);
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
    <div className={css.container3}>
      <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Music Trends Blog - - Musicpy</title>
  <meta name="description" content="Stay updated with the latest music trends and news. Read our blog for insightful articles, artist interviews, and in-depth analyses of the music industry." />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Music Trends Blog",
    "description": "Stay updated with the latest music trends and news. Read our blog for insightful articles, artist interviews, and in-depth analyses of the music industry."
  }) }} />
</Head>

      <div> <Navbar data={artistsData}/></div>
      <h1 style={{ display: "none" }}>Unlock a World of Musical Delight with Musicpy: Your Premier Source for Exceptional Tunes!</h1>

       
        <div className={css.container1}>
         
          <input onChange={HandleInputChange} placeholder='Search in News And Articles' className={css.in} />
            
          <div className={css.container}> 
          {
            suggestions?.slice(0, itemsToShow).map((i,k)=>(
              <Link key={k} href={`blog/${i?.title}`}>   <Blogcard key={k} img={i?.img} title={i?.title} cat={i?.cat} desc={i?.desc} /></Link>
            ))
          }
          {
            suggestions?.length ===0 ? (<div className={css.notfound}><span>Sorry cant Find That</span></div>):("")
          }
          
      
</div>
      

        </div>



        {itemsToShow < suggestions?.length && (
       <div className={css.butcont}> <span className={css.but} onClick={handleLoadMore}>More Articles...</span></div>
       
      )}
    </div>
  )
}

export default Index