import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";

export default function CurrentTrack() {
    const [{ token, currentPlaying,currentTrackId }, dispatch] = useStateProvider();
    // console.log(currentTrackId);
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
        if (response.data !== "") {
          const currentPlaying = {
            id: response.data.id,
            name: response.data.name,
            artists: response.data.artists.map((artist) => artist.name),
            image: response.data.album.images[2].url,
            preview_url:response.data.preview_url,
          };
          console.log('currentPlaying >>>>>>>>',currentPlaying);
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
        } else {
          dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
        }
      };
      getCurrentTrack();
    }, [token, dispatch, currentTrackId]);
    return (
      <Container>
        {currentPlaying && (
          <div className="track">
            <div className="track__image">
              <img src={currentPlaying.image} alt="currentPlaying" />
            </div>
            <div className="track__info">
              <h4 className="track__info__track__name">{currentPlaying.name}</h4>
              <h6 className="track__info__track__artists">
                {currentPlaying.artists.join(", ")}
              </h6>
            </div>
          </div>
        )}
      </Container>
    );
  }
  
  const Container = styled.div`
    .track {
      display: flex;
      align-items: center;
      gap: 1rem;
      &__image {
      }
      &__info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        &__track__name {
          color: white;
        }
        &__track__artists {
          color: #b3b3b3;
        }
      }
    }
  `;