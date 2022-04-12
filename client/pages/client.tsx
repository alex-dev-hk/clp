import { func } from "prop-types"
import { useRef, useState } from "react"
import EVENTS from "../config/events"
import { useSockets } from "../context/socket.context"

export default function client(){
    const {socket, clientResult, setClientResult} = useSockets()
    const [minusCount, setMinusCount] = useState(0)
    const [plusCount, setPlusCount] = useState(0)


    
  
    function handleMinusClickHandler(){
        setMinusCount(minusCount+1)
        setClientResult({...clientResult, minus:[...Array(minusCount+1).keys()].map(n=>n+1)})
      
       
    }
    function handlePlusClickHandler(){
        setPlusCount(plusCount + 1)
        setClientResult({...clientResult, plus:[...Array(plusCount + 1).keys()].map(n=>n+1)})
      
    }

    

    socket.emit(EVENTS.CLIENT.SEND_CLIENT_RESULT, {clientResult})


    return <div>
        <>{socket.id}</>
        <button onClick={handleMinusClickHandler}>{minusCount}: -</button> <br/>
        <button onClick={handlePlusClickHandler}>{plusCount}: +</button> 
    </div>
}