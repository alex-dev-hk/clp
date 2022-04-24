import express from 'express'
import { createServer as createHttpsServer } from 'https'
import { createServer } from 'http'
import * as fs from 'fs';
import path from 'path'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import logger from './utils/logger'
import { version } from '../package.json'

import socket from './socket'

import config from 'config'
import { createPrivateKey } from 'crypto'


// fs
// const privateKey = fs.readFileSync(__dirname)
console.log(__dirname)
const EVENTS:any = config.get("EVENTS")

// Http
const privateKey  = fs.readFileSync(path.join(__dirname + '/../security/clp-ws-server.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname + '/../security/clp-ws-server.pem'), 'utf8');

const port:number = config.get("port");
const host:string = config.get("host");
 const credentials = {key: privateKey, cert: certificate}
const app = express()
// header
const corsOrigin:string = config.get("corsOrigin")

const httpsServer = createHttpsServer(credentials ,app);
const httpServer = createServer(app);


// initialise websocket with Express
const io = new Server(httpsServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    },
})

io.on(EVENTS.connection, (socket: Socket)=>{
    console.log("user connected")
    console.log(socket.id)

})




app.get('/', (_: any,res: any) => res.send(`Server is up and running Version ${version}`))


httpsServer.listen(port, host, () => {

    logger.info(`Server version: ${version}`)
    logger.info(`Running https://${host}:${port} 🚀`)
    socket({io})

})
