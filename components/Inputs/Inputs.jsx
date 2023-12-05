import React from 'react'
import css from "./Inputs.module.css"
import InputCard from '../InputCards/InputCard'
import { useEffect, useState } from 'react';

function Inputs({ place, data }) {
  const [alldata, setAlldata] = useState(data);
  const [check, setcheck] = useState(false);
  const [suggestions, setSuggestions] = useState(data);
  const [inputValue, setInputValue] = useState('');

  function handleChange(e) {

    
   const input = e.target.value;
    if(input?.length>=2){
      setcheck(true)


      setInputValue(input);

  const filteredSuggestions = alldata?.reduce((matches, task, singerIndex) => {
  const singerMatch = task?.singer?.toLowerCase().includes(input.toLowerCase());
  let singerMatches = [];

  if (singerMatch) {

    singerMatches?.push(task?.singer);
  }

  task.all.forEach((album, albumIndex) => {
    const albumNameMatch = album?.album_name?.toLowerCase().includes(input.toLowerCase());

    album?.songs?.forEach((song, songIndex) => {
      const songNameMatch = song?.songname?.toLowerCase().includes(input.toLowerCase());

      if (songNameMatch) {
        // Collect the matches in an array
        matches?.push({
          singer: task?.singer,
          album: album?.album_name,
          song: song?.songname,
          img:task?.img,
          singerIndex,
          albumIndex,
          songIndex,
        });
      }
    });
  });

  // If there are no songNameMatches, check for singer matches
  if (singerMatches.length != 0) {
    matches.push({
      singer: task?.singer,
      img:task?.img,
      
      singerIndex,
    });
  }

  return matches;
}, []);

    
    


    setSuggestions(filteredSuggestions);


    }
    else(
      setcheck(false)
    )
    
  }

  return (
    <div className={css.inputcont}>
      <div className={css.in}>
        <input placeholder='"Who or what are you in the mood for today?"'
         input type="text" onChange={handleChange}
        />
      </div>
      <div className={css.res}>
        {check?(suggestions?.map((suggestion, index) => {
          return (
            <InputCard
              key={index}
              img={suggestion?.img}
              singer={suggestion?.singer}
              albums={suggestion?.album}
              track={suggestion?.song}
            />
          );
        })):("")}
      </div>
    </div>
  );
}

export default Inputs;