import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useSockets } from '../context/socket.context'
import  RoomsContainer  from '../containers/Rooms'
import MessageContainer from '../containers/Messages'
import ChartContainer from '../containers/chart'

import { useRef } from 'react'

export default function Home() {
  
  const {socket} = useSockets()
  
  return (
  <div>
   <p>{socket.id}</p>
   <ChartContainer />
    {/* {!username && (
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
    )} */}

      <Link href="/client"> client </Link>

  </div>
  )}







