import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io"
import logger from "./utils/logger"


const EVENTS = {
    connection: 'connection',
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
        SEND_CLIENT_RESULT: "SEND_CLIENT_RESULT",
    },
    SERVER: {
        ROOMS: 'ROOMS',
        JOINED_ROOM: 'JOIN_ROOM',
        ROOM_MESSAGE: "ROOM_MESSAGE",
        RECEIVED_CLIENT_RESULT: "RECEIVED_CLIENT_RESULT"

    }
}

const rooms: Record<string, {name: string }> = {}

function socket({io}: {io:Server}) {
    logger.info(`Sockets enabled `);

    io.on(EVENTS.connection, (socket: Socket) => {
        logger.info(`User connected: ${socket.id}`)

        socket.emit(EVENTS.SERVER.ROOMS, rooms);
        
        // when a user create a new Room 
        socket.on(EVENTS.CLIENT.CREATE_ROOM, ({roomName}) => {
        //    logger.info({roomName});
         
           // create a roomId
           const roomId = nanoid()
           // add a new room to the rooms object
           rooms[roomId] = {
               name :  roomName
           }
           console.log({roomId})
           // socket.join(roomId)
           socket.join(roomId);
           // broadcast an event saying there is a new room 
           socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

           // emit back to the room creater with all the rooms
           socket.emit(EVENTS.SERVER.ROOMS, rooms)
           // emit event back to the createor saying they have joined a room
           socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)

       })

        // when a user sends a room message
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, ({roomId, message, username}) => {
                const date = new Date();
                socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                    message,
                    username,
                    time: `${date.getHours}: ${date.getMinutes}`
                })
        })

        // when a user joins a room 
        socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId)=>{
                socket.join(roomId)

                socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId)

        })


        socket.on(EVENTS.CLIENT.SEND_CLIENT_RESULT, (clientResult) => {
            console.log(clientResult)

        })

    })
}













export default socket