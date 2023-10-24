import React, { useState } from "react";
import styled from "styled-components";
import {BsFillPlayCircleFill,BsFillPauseCircleFill,BsShuffle,} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "./StateProvider";
import axios from "axios";
import { useEffect } from "react";
import { reducerCases } from "./Constants";
import { FaPause } from "react-icons/fa";
import { useRef } from "react";

export default function PlayerControls() {
  const [{ token,currentTrackId,currentTrackPreviewUrl }, dispatch] = useStateProvider();
  const audioPlayer = useRef();
  const [isPlaying,setPlaying] = useState(false);
  
  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      const currentTrackPreviewUrl = {
        preview_url:response.data.preview_url,
      }
      dispatch({type:reducerCases.SET_PREVIEW_URL,currentTrackPreviewUrl})
    }
    getCurrentTrack();  
  },[token,currentTrackId,dispatch])

  let song = currentTrackPreviewUrl;
  console.log("+++++++",song);
  
  const changePlayPause = () =>{
    setPlaying(!isPlaying);
    if(isPlaying){
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  }

  return (
    <Container>
      <audio src={song} ref={audioPlayer}/>
      <div className="previous">
        <CgPlayTrackPrev />
      </div>

      <div onClick={changePlayPause}>{isPlaying ?
        <i>
          <BsFillPauseCircleFill />
        </i>
        :
        <i>
          <BsFillPlayCircleFill />
        </i>}
      </div>

      <div className="next">
        <CgPlayTrackNext />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  svg {
    color: #b3b3b3;
    transition: 0.2s ease-in-out;
    &:hover {
      color: white;
    }
  }
  .state {
    svg {
      color: white;
    }
  }
  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;