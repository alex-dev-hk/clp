import express from 'express'
import { createServer } from 'http' 
import { Server } from 'socket.io'
import cors from 'cors'
import logger from './utils/logger'
import { version } from '../package.json'

import socket from './socket'

import config from 'config'


//Http
const port = config.get<number>("port");
const host = config.get<string>("host");
const app = express()
//header
const corsOrigin = config.get<string>("corsOrigin")

const httpServer = createServer(app);
// initialise websocket with Express
const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    },
})

app.get('/', (_,res) => res.send(`Server is up and running Version ${version}`))
httpServer.listen(port, host, () => {
  
    logger.info(`Server version: ${version}`)
    logger.info(`Running https://${host}:${port} 🚀`)
    socket({io})
  
})