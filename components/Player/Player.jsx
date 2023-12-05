// components/AudioPlayer.js
import React, { useState, useEffect } from 'react';
import css from "./Player.module.css"
import {FaPlay} from "react-icons/fa"
import {HiMiniPause} from "react-icons/hi2"
const AudioPlayer = ({ link }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = React.useRef(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  const handleSeek = (event) => {
    const audio = audioRef.current;
    const progressBar = document.getElementById('progress-bar');
    
    // Calculate seek percentage directly from the synthetic event
    const seekPercentage = (event.nativeEvent.offsetX / progressBar.clientWidth) * 100;
    
    // Calculate seek time
    const duration = audio.duration;
    const seekTime = (seekPercentage / 100) * duration;
  
    // Set currentTime only if it's a valid value
    if (!isNaN(seekTime)) {
      audio.currentTime = seekTime;
      setProgress(seekPercentage);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      const duration = audio.duration;
      const currentTime = audio.currentTime;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  return (
    <div className={css.container}>
      <audio ref={audioRef} src={link} />
      <div className={css.butcont}>
        <span className={css.but} onClick={handlePlayPause}>
          {isPlaying ?<div className={css.playbut}><HiMiniPause size={45} /> </div> :<div className={css.playbut}><FaPlay size={35} /></div> }
        </span>
       
      </div>
      <div
        id="progress-bar"
        className={css.progress1}
        onClick={(e) => handleSeek(e)}
      >
        <div
          className={css.progress1percent}
          style={{
            width: `${progress}%`,
            transition: 'width 0.2s ease',
          }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
