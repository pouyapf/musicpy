import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import css from  '../../styles/blogid.module.css'
import Image from 'next/image'
import {useRouter} from 'next/router';
import { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import Head from 'next/head';

export async function getStaticPaths() {
  try {
    const client = await clientPromise; // Ensure you have the MongoDB client instance
    const db = client.db("blog");

    const response = await db
      .collection("blogid")
      .find({})
      .toArray();

    const paths = response.map(post => ({
      params: {
        blogid: `${post.title}`,
      },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    console.error(e);
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  try {
    const client = await clientPromise;
    const blogDb = client.db("blog");
    const musicDb = client.db("music");

    // Fetch data from the "blogid" collection in the "blog" database
    const data = await blogDb
      .collection("blogid")
      .findOne({ title: params.blogid });

    // Fetch all documents from the "artists" collection in the "music" database
    const allArtistsData = await musicDb
      .collection("artists")
      .find({})
      .toArray();

    return {
      props: {
        data: JSON.parse(JSON.stringify(data)),
        allArtistsData: JSON.parse(JSON.stringify(allArtistsData)),
      },
      revalidate: 120,
    };
  } catch (e) {
    console.error(e);
  }
}




function Blogid({data,allArtistsData}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };




  const timeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
  
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
  
    const days = Math.floor(hours / 24);
    if (days < 30) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  
    const months = Math.floor(days / 30);
    if (months < 12) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  
    const years = Math.floor(months / 12);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  };
        const timestamp = new Date(parseInt(data?._id.toString().substring(0, 8), 16) * 1000);
        const router=useRouter()
        if(router.isFallback){  
          return<h1>Page Is Loading...</h1>
        } 
        


  return (
    

    
    <div> <Navbar data={allArtistsData}/>
    <h1 style={{ display: "none" }}>{data?.title}</h1>
    <Head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{data?.title}- Musicpy</title>
  <meta name="description" content={data?.desc} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "http://schema.org",
    "@type": "WebPage",
    "name": "Music Trends Blog",
    "description": `${data?.desc}`
  }) }} />
</Head>


<div className={css.container}>
 
            <div className={css.body}>
            <div className={css.Spin}> {!imageLoaded && <LoadingSpinner />}</div>
              
                <Image onLoad={handleImageLoad}
         
         style={{ opacity: imageLoaded ? 1 : 0 }} className={css.image1} width={1000} height={10000} alt={data?.title} src={data?.img}/>
                <div className={css.head}> <h1>{data?.title}</h1>
                <div className={css.headright}><h2>{data?.cat}</h2>
                <h3>Last updated: {timeAgo(new Date(timestamp))}</h3></div>
                
                
                </div>
                
                
               
                <div className={css.des}>
                    <p>{data?.desc}</p>
                    {
                      
                      data?.image2?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image2}/></div>):("")
                     
                    }
                    {
                      
                      data?.title2?(<h2 className={css.intitle}>{data.title2}</h2>):("")
                     
                    }
                    { data?.desc2?(<p>{data.desc2}</p>):("")}
                    {
                      data?.image3?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image3}/></div>):("")
                     
                    }
                     {
                      
                      data?.title3?(<h2 className={css.intitle}>{data.title3}</h2>):("")
                     
                    }
                    { data?.desc3?(<p>{data.desc3}</p>):("")}

                    {
                      
                      data?.image4?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image4}/></div>):("")
                     
                    }
                    {
                      
                      data?.title4?(<h2 className={css.intitle}>{data.title4}</h2>):("")
                     
                    }
                    { data?.desc4?(<p>{data.desc4}</p>):("")}
                    {
                      data?.image5?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image5}/></div>):("")
                     
                    }
                     {
                      
                      data?.title5?(<h2 className={css.intitle}>{data.title5}</h2>):("")
                     
                    }
                    { data?.desc5?(<p>{data.desc5}</p>):("")}

                    {
                      
                      data?.image6?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image6}/></div>):("")
                     
                    }
                    {
                      
                      data?.title6?(<h2 className={css.intitle}>{data.title6}</h2>):("")
                     
                    }
                    { data?.desc6?(<p>{data.desc6}</p>):("")}
                    {
                      data?.image7?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image7}/></div>):("")
                     
                    }
                     {
                      
                      data?.title7?(<h2 className={css.intitle}>{data.title7}</h2>):("")
                     
                    }
                    { data?.desc7?(<p>{data.desc7}</p>):("")}

                    {
                      
                      data?.image8?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image8}/></div>):("")
                     
                    }
                    {
                      
                      data?.title8?(<h2 className={css.intitle}>{data.title8}</h2>):("")
                     
                    }
                    { data?.desc8?(<p>{data.desc8}</p>):("")}
                    {
                      data?.image9?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image9}/></div>):("")
                     
                    }
                     {
                      
                      data?.title9?(<h2 className={css.intitle}>{data.title9}</h2>):("")
                     
                    }
                    { data?.desc9?(<p>{data.desc9}</p>):("")}

                    {
                      
                      data?.image10?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image10}/></div>):("")
                     
                    }
                    {
                      
                      data?.title10?(<h2 className={css.intitle}>{data.title10}</h2>):("")
                     
                    }
                    { data?.desc10?(<p>{data.desc10}</p>):("")}
                    {
                      data?.image11?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image11}/></div>):("")
                     
                    }
                     {
                      
                      data?.title11?(<h2 className={css.intitle}>{data.title11}</h2>):("")
                     
                    }
                    { data?.desc11?(<p>{data.desc11}</p>):("")}

                    {
                      
                      data?.image12?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image12}/></div>):("")
                     
                    }
                    {
                      
                      data?.title12?(<h2 className={css.intitle}>{data.title12}</h2>):("")
                     
                    }
                    { data?.desc12?(<p>{data.desc12}</p>):("")}
                    {
                      data?.image13?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image13}/></div>):("")
                     
                    }
                     {
                      
                      data?.title13?(<h2 className={css.intitle}>{data.title13}</h2>):("")
                     
                    }
                    { data?.desc13?(<p>{data.desc13}</p>):("")}


                    {
                      
                      data?.image14?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image14}/></div>):("")
                     
                    }
                    {
                      
                      data?.title14?(<h2 className={css.intitle}>{data.title14}</h2>):("")
                     
                    }
                    { data?.desc14?(<p>{data.desc14}</p>):("")}
                    {
                      data?.image15?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image15}/></div>):("")
                     
                    }
                     {
                      
                      data?.title15?(<h2 className={css.intitle}>{data.title15}</h2>):("")
                     
                    }
                    { data?.desc15?(<p>{data.desc15}</p>):("")}

                    {
                      
                      data?.image16?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image16}/></div>):("")
                     
                    }
                    {
                      
                      data?.title16?(<h2 className={css.intitle}>{data.title16}</h2>):("")
                     
                    }
                    { data?.desc16?(<p>{data.desc16}</p>):("")}
                    {
                      data?.image17?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image17}/></div>):("")
                     
                    }
                     {
                      
                      data?.title17?(<h2 className={css.intitle}>{data.title17}</h2>):("")
                     
                    }
                    { data?.desc17?(<p>{data.desc17}</p>):("")}

                    {
                      
                      data?.image18?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image18}/></div>):("")
                     
                    }
                    {
                      
                      data?.title18?(<h2 className={css.intitle}>{data.title18}</h2>):("")
                     
                    }
                    { data?.desc18?(<p>{data.desc18}</p>):("")}
                    {
                      data?.image19?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image19}/></div>):("")
                     
                    }
                     {
                      
                      data?.title19?(<h2 className={css.intitle}>{data.title19}</h2>):("")
                     
                    }
                    { data?.desc19?(<p>{data.desc19}</p>):("")}

                    {
                      
                      data?.image20?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image20}/></div>):("")
                     
                    }
                    {
                      
                      data?.title20?(<h2 className={css.intitle}>{data.title20}</h2>):("")
                     
                    }
                    { data?.desc20?(<p>{data.desc20}</p>):("")}
                    {
                      data?.image21?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image21}/></div>):("")
                     
                    }
                     {
                      
                      data?.title21?(<h2 className={css.intitle}>{data.title21}</h2>):("")
                     
                    }
                    { data?.desc21?(<p>{data.desc21}</p>):("")}

                    {
                      
                      data?.image22?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image22}/></div>):("")
                     
                    }
                    {
                      
                      data?.title22?(<h2 className={css.intitle}>{data.title22}</h2>):("")
                     
                    }
                    { data?.desc22?(<p>{data.desc22}</p>):("")}
                    {
                      data?.image23?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image23}/></div>):("")
                     
                    }
                     {
                      
                      data?.title23?(<h2 className={css.intitle}>{data.title23}</h2>):("")
                     
                    }
                    { data?.desc23?(<p>{data.desc23}</p>):("")}

                    {
                      
                      data?.image23?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image23}/></div>):("")
                     
                    }
                    {
                      
                      data?.title23?(<h2 className={css.intitle}>{data.title23}</h2>):("")
                     
                    }
                    { data?.desc23?(<p>{data.desc23}</p>):("")}
                    {
                      data?.image24?(<div className={css.imagescont}><Image alt='Blog_pic' className={css.image2} width={1000} height={10000} src={data?.image24}/></div>):("")
                     
                    }
                     {
                      
                      data?.title24?(<h2 className={css.intitle}>{data.title24}</h2>):("")
                     
                    }
                    { data?.desc24?(<p>{data.desc24}</p>):("")}

                </div>


            </div>
        

        </div>




    </div>
  )
}

export default Blogid