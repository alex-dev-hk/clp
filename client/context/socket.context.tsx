import { createContext, useContext, useEffect, useState } from 'react'
import io,{Socket} from 'socket.io-client'
import {SOCKET_URL} from '../config/default'
import EVENTS from '../config/events';

interface Context {
    socket: Socket;
    username?: string;
    setUsername:  Function;
    messages?: {message: string; time:string; username: string}[];
    setMessages: Function;
    clientResult: {minus:[], plus:[]};
    setClientResult: Function;
    roomId?: string;
    rooms: object;
}

const socket = io(SOCKET_URL, {transports: [ 'websocket' ],
upgrade: true});

const SocketContext = createContext<Context>({
    socket,
    setUsername: () => false,
    setMessages: () => false,
    clientResult: {minus:[], plus:[]},
    setClientResult: () => false,
    rooms: {},
    messages: [],
})

function SocketsProvider (props:any) {
const [username, setUsername] = useState("");
const [clientResult, setClientResult] = useState({});
const [roomId, setRoomId] = useState("");
const [rooms, setRooms] = useState({});
const [messages, setMessages] = useState([]);

    socket.on(EVENTS.SERVER.ROOMS, (value)=>{
        setRooms(value)
    })
    socket.on(EVENTS.SERVER.JOINED_ROOM, (value)=> {
        setRoomId(value)

        setMessages([])
    })

    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({message, username, time})=> {
        setMessages([
            ...messages,{
                message, 
                username,
                time
            }

        ])

    })

    socket.on(EVENTS.SERVER.RECEIVED_CLIENT_RESULT,(clientResult)=>{
        setClientResult(clientResult)
    })




    return (
        <SocketContext.Provider 
            value={{
                socket,
                clientResult,
                setClientResult,
                username,
                setUsername,
                rooms,
                roomId,
                messages,
                setMessages
            }}
            {...props}
        />
    )
} 

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider

