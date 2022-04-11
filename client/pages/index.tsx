import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useSockets } from '../context/socket.context'
import  RoomsContainer  from '../containers/Rooms'
import MessageContainer from '../containers/Messages'

import { useRef } from 'react'

export default function Home() {
  
  const {socket, username, setUsername, roomId} = useSockets()
  const usernameRef = useRef(null)

  function handlerSetUsername(){
    const value = usernameRef.current.value
    if(!value){
      return;
    }
    setUsername(value);
    localStorage.setItem("username", value);
  }
  
  return (
  <div>
  
    {!username && (
      <div>
          <input placeholder='user name' ref={usernameRef}/>  
          <button onClick={handlerSetUsername}>Start</button>
      </div>)}

    {username && (
      <>
        <p>{socket.id}</p>
        <p>Room Id: {roomId}</p>
        <RoomsContainer />
        <MessageContainer/>
      </>
    )}

      <Link href="/client"> client </Link>

  </div>
  )}







