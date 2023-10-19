import React, { useEffect } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./body";
import axios from "axios";
import { reducerCases } from "./Constants";
import { useStateProvider } from "./StateProvider";

export default function Spotify(){
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() =>{
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      console.log({data});
      const userInfo = {
        userId:data.id,
        userName:data.display_name,
      }
      dispatch({type:reducerCases.SET_USER,userInfo})
    }
    getUserInfo();
  },[token,dispatch])
  
  
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <Navbar />
          <div className="body_contents">
            <Body />
          </div>
        </div>
      </div>

      <div className="spotify_footer">
      </div>
    </Container>
  )
}


const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;