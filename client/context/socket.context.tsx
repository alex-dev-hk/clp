import { createContext, useContext, useState } from 'react'
import io,{Socket} from 'socket.io-client'
import {SOCKET_URL} from '../config/default'

interface Context {
    socket: Socket;
    clientResult: {minus:[], plus:[]};
    setClientResult: Function;
    clientResults: [],
    setClientResults: Function;
}

const socket = io(SOCKET_URL, {transports: [ 'websocket' ],
upgrade: true});

const SocketContext = createContext<Context>({
    socket,
    clientResult: {minus:[], plus:[]},
    setClientResult: () => false,
    clientResults: [],
    setClientResults: () => false,

})

function SocketsProvider (props:any) {
const [clientResult, setClientResult] = useState({});
const [clientResults, setClientResults] = useState([]);

    return (
        <SocketContext.Provider 
            value={{
                socket,
                clientResult,
                setClientResult,
                clientResults,
                setClientResults,
            }}
            {...props}
        />
    )
} 

export const useSockets = () => useContext(SocketContext)

export default SocketsProvider

