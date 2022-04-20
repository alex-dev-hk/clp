import { Server, Socket } from "socket.io"
import logger from "./utils/logger"
import EVENTS from '../config/events';


function socket({io}: {io:Server}) {
    logger.info(`Sockets enabled `);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected: ${socket.id}`)   

        socket.on(EVENTS.CLIENT.SEND_CLIENT_RESULT, (dataList) => {
           //console.log(dataList)
           socket.broadcast.emit(EVENTS.SERVER.RECEIVED_CLIENT_RESULT, dataList)
        })

        socket.on(EVENTS.CLIENT.END_GAME, ()=>{
            //console.log('socket disconnected!')
            socket.disconnect();
        })

    })
}













export default socket