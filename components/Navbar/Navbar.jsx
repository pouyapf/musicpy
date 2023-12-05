import React from 'react'
import css from "./Navbar.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Inputs from '../Inputs/Inputs'
import { TfiMenuAlt } from "react-icons/tfi";
import { useState } from 'react'
import Cher from "../../assets/Screenshot 2023-11-21 000620_auto_x2 (1).png";


function Navbar({place,data}) {
  const [mneumob,setmob]=useState(false)
  function handlemenu(){
    setmob(!mneumob)



  }
  return (
    <nav>
        <div className={css.container}>
           

        <div className={css.image}> 
        <span ><Image alt='Logo' width={1000} className={css.logo} height={1000} src={Cher}/></span>
        
      
          
          </div>
          <div className={css.input}>
         <Inputs data={data} place={"Who or what are you in the mood for today?"}/></div>
            
           
          
       
        <div onClick={handlemenu} className={css.menumob}>
          <span className={css.menuicon}><TfiMenuAlt size={30} /></span>
          <div style={{ display: mneumob ? 'block' : 'none' }} className={css.menupad}>
          <Link href="/"><div className={css.but2}>Home</div></Link>
              <Link href="/Artists"><div className={css.but2}>Singers</div></Link>
              <Link href="/blog"><div className={css.but2}>Blog</div></Link></div>
         


        </div>



            <div className={css.menu}>
              
            <Link href="/blog"><span className={css.but}>Blog</span></Link>
        
              <Link href="/Artists"><span className={css.but}>See All Singers</span></Link>
              <Link href="/"><span className={css.but}>Home</span></Link>
              
              
                
                 
                
                
                

            </div>





        </div>



    </nav>
  )
}

export default Navbar