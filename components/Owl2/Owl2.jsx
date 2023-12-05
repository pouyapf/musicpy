import React from 'react'
import css from "./Owl2.module.css"
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
import OwlCard2 from '../OwlCard2/OwlCard2';


import { useState ,useEffect } from 'react';

function Owl2({artistsData}) {



  const [items, setitems] = useState(null);
  const [margin, setmargin] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      // Set the constant value based on screen width
      if (window.innerWidth >= 768) {
        setitems(3)
        setmargin(100)
      } else {
        setitems(1.5)
        setmargin(150)
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
            <h3>Trending:</h3>



        </div>
   <div className={css.container} >
<OwlCarousel autoplayHoverPause={true}    autoplay={true} loop={true} items={items} margin={margin} nav={false }>
{artistsData?.map((artist, artistIndex) =>
  artist?.all?.map((album, albumIndex) =>
    album?.songs?.map((song, songIndex) => {
      if (song?.tr) {
        return <OwlCard2 album={album?.album_name} link={song?.link} img={artist?.img} Singer={artist?.singer} Track={song?.songname} key={songIndex}/> ;
      }
      return null;
    })
  )
)}
  
</OwlCarousel></div>



    </div>
  )
}

export default Owl2