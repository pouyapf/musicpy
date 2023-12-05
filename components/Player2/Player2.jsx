import React, { useState, useEffect } from 'react';
import css from "./Player2.module.css";
import { FaPlay } from "react-icons/fa";
import { HiMiniPause } from "react-icons/hi2";
import { FaDownload } from "react-icons/fa6";

const AudioPlayer2 = ({ link }) => {
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
    const clickPosition = event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.clientWidth;
    const seekPercentage = (clickPosition / progressBarWidth) * 100;
    const duration = audio.duration;
    const seekTime = (seekPercentage / 100) * duration;
    audio.currentTime = seekTime;
    setProgress(seekPercentage);
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
          {isPlaying ? <HiMiniPause size={45} /> : <FaPlay size={35} />}
        </span>
        <span className={css.but2}><a href={link}><FaDownload size={40} /></a></span>
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

export default AudioPlayer2;
