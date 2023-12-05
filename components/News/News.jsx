import React from 'react'
import css from "./News.module.css"
import NewsCard from '../NewsCard/NewsCard'
import Link from 'next/link'

function News({blogData}) {
  const a=4;
  return (
    <div className={css.container}>
        <div className={css.head}><h4 >News And Articles:</h4></div>
        <div className={css.cardcontainer}>   
        {blogData?.slice(-4).map((i, k) => (
  <Link key={k} href={`/blog/${i?.title}`}> <NewsCard img={i?.img} decs={i?.desc} key={k} title={i?.title} /></Link>
))}
        </div>
      
      

        




    </div>
  )
}

export default News