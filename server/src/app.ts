import express from 'express'
import { createServer } from 'http' 
import { Server, Socket } from 'socket.io'
import EVENTS from '../config/events'
import cors from 'cors'
import logger from './utils/logger'
import { version } from '../package.json'

import socket from './socket'

import config from 'config'


//Http
const port:number = config.get("port");
const host:string = config.get("host");
const app = express()
//header
const corsOrigin:string = config.get("corsOrigin")

const httpServer = createServer(app);
// initialise websocket with Express
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    },
})

io.on(EVENTS.connection, (socket: Socket)=>{
    console.log("user connected")
    console.log(socket.id)
  
})




app.get('/', (_,res) => res.send(`Server is up and running Version ${version}`))


httpServer.listen(port, host, () => {
  
    logger.info(`Server version: ${version}`)
    logger.info(`Running https://${host}:${port} 🚀`)
    socket({io})
  
})
