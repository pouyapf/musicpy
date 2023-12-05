import React from 'react'
import css from "./Owl.module.css"
import Link from 'next/link';
import { useState ,useEffect } from 'react';
var $ = require("jquery");
if (typeof window !== "undefined") {
   window.$ = window.jQuery = require("jquery");
}

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import dynamic from 'next/dynamic';
const OwlCarousel =dynamic(()=>import('react-owl-carousel'),{
    ssr:false,
});

import OwlCard from '../OwlCard/OwlCard';
function Owl({artistsData}) {



  const [items, setitems] = useState(null);
  const [margin, setmargin] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      // Set the constant value based on screen width
      if (window.innerWidth >= 768) {
        setitems(3)
        setmargin(0)
      } else {
        setitems(2)
        setmargin(70)
      }
    };

    // Set initial value on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 






  return (
    <div className={css.container1}>
        <div className={css.heading}>
            <h3>Recently Aded:</h3>



        </div>
   <div  className={css.container} >
<OwlCarousel animateIn={true} autoplayHoverPause={true}  autoplay={true} loop={true} items={items} margin={margin} nav={false }>

{artistsData?.map((artist, artistIndex) =>
  artist?.all?.map((album, albumIndex) =>
    album?.songs?.map((song, songIndex) => {
      if (song?.new) {
        return <Link key={songIndex} href={`/Artists/${artist?.singer}/${album?.album_name}/${song?.songname}`}> <div className={css.item1}> <OwlCard key={songIndex} className='item1' img={artist?.img} singer={artist?.singer} track={song?.songname} album={album?.album_name}/></div></Link> ;
      }
      return null;
    })
  )
)}


 

  
    
</OwlCarousel></div>



    </div>
  )
}

export default Owl