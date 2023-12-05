import React from 'react'
import css from "./Links.module.css"
import AudioPlayer2 from '../Player2/Player2'
import Link from 'next/link'
function Links({link,songname,inlinkname,inlinkal,inlinksinger}) {
  
  return (
    <div className={css.container}>
      <Link  href={`/Artists/${inlinksinger}/${inlinkal}/${inlinkname}`}>
        <h3>{songname}</h3></Link>
        <div className={css.Aud}><AudioPlayer2 link={link} /></div>
        
    </div>
  )
}

export default Links