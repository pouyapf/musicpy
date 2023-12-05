import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Owl from '../components/Owl/Owl'
import Owl2 from '../components/Owl2/Owl2'
import OwlCard2 from '../components/OwlCard2/OwlCard2'
import AudioPlayer from '../components/Player/Player'
import News from '../components/News/News'
import { MongoClient } from 'mongodb'
import css from '../styles/main.module.css'
import Head from 'next/head';





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
      }, revalidate: 60,
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



function Index({artistsData,blogData}) {


  return (
    
        <div className={css.container}> 
        <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Discover and Download the Latest Music - Musicpy</title>
  <meta name="description" content="Explore a world of music on Your Music Hub. Find and download the latest songs, albums, and tracks from your favorite artists." />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Your Music Hub",
    "description": "Explore a world of music on Your Music Hub. Find and download the latest songs, albums, and tracks from your favorite artists."
  }) }} />
</Head>

<h1 style={{ display: "none" }}>Explore the Latest and Greatest Music Downloads on Musicpy Your Ultimate Destination for High-Quality Tunes!</h1>

        <div ><Navbar data={artistsData} place={"Enter Artist Name Or Track Name:"}/></div>
        <div> <Owl artistsData={artistsData}/></div>
        <div> <Owl2 artistsData={artistsData}/></div>
        <div className={css.news}> <News  blogData={blogData}/></div>
 
    
      
     



    </div>
  )
}

export default Index