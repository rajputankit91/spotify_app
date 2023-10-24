import React, { useEffect,useRef,useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Body from "./Body.jsx";
import axios from "axios";
import { reducerCases } from "./Constants";
import { useStateProvider } from "./StateProvider";
import Footer from "./Footer";

export default function Spotify(){
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();
  const bodyScrolled = () => {
    bodyRef.current.scrollTop >= 30
      ? setNavBackground(true)
      : setNavBackground(false);
    bodyRef.current.scrollTop >= 268
      ? setHeaderBackground(true)
      : setHeaderBackground(false);
  }; 

  
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
        <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
          <Navbar navBackground={navBackground}/>
          <div className="body_contents">
            <Body headerBackground={headerBackground}/>
          </div>
        </div>
      </div>

      <div className="spotify_footer">
        <Footer />
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
    background-color: rgb(93, 109, 120);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;