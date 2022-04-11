import { func } from "prop-types"
import { useState } from "react"
import EVENTS from "../config/events"
import { useSockets } from "../context/socket.context"

export default function client(){
    const {socket} = useSockets()
    const [minusCount, setMinusCount] = useState(0)
    const [plusCount, setPlusCount] = useState(0)
    
    function handleMinusClickHandler(){
        setMinusCount(minusCount + 1)
        socket.timeout(5000).emit(EVENTS.CLIENT.CLIENT_CONNECTION, (err) => {
            if(err){
                
            }
        })
    }
    function handlePlusClickHandler(){
        setPlusCount(plusCount + 1)
    }

    



    return <div>
        <>{socket.id}</>
        <button onClick={handleMinusClickHandler}>{minusCount}: -</button> <br/>
        <button onClick={handlePlusClickHandler}>{plusCount}: +</button> 
    </div>
}