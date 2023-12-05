import React, { useEffect } from 'react';
import css from "./Pagination.module.css"
import { useState } from 'react';
function Pagination({reset,totalposts,postperpage,setcurrentPage}) {
    let pages=[];
    for(let i=1;i<=Math.ceil(totalposts/postperpage);i++){
        pages.push(i)
    }
    const [index1, setindex1] = useState(10);
    const [index2, setindex2] = useState(-1);
    const [count, setcount] = useState(0);
  
   
    useEffect(()=>{
        setindex1(10)
        setindex2(-1)
     


    },[reset])
    function handleclick(page){
        if(totalposts>40){  if(page>count){
          
        
            setcount(page);
            setindex1(index1+1)
            
         setindex2(index2+1)
               
            

     
       

    }
    if(page<count){

        setcount(page);
        if(index1!=10){setindex1(index1-1)}

       
        
        if(index2!=-1){setindex2(index2-1)}
        

    }}
       
      

        
        setcurrentPage(page)
    }
  return (
    <div>
        {
            pages.map((page,index)=>{
              
                    if(index<index1 && index>index2){
                        return <button className={css.Pagination} key={index} onClick={()=>handleclick(page)} >{page}</button>
              
             
                    
                
                    } 
               
            })
        }
    </div>
  )
}

export default Pagination