import { useRef } from "react"
import EVENTS from "../config/events"
import { useSockets } from "../context/socket.context"

function RoomsContainer (){
    const {socket, rooms, roomId} = useSockets()
    const newRoomRef = useRef(null)

    function handleCreateRoom() {
        const roomName = newRoomRef.current.value || ''
        // check value
        if(!String(roomName).trim()) return;
        // emit event
        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName})
        // reset 
        newRoomRef.current.value = "";
    }

    function handleJoinRoom(key) {
        if(key === roomId){
            return;
        }

        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key)
    }

    return(
        <nav>
            <div>
                <input ref={newRoomRef} placeholder="Room name"></input>
                <button onClick={handleCreateRoom}>Create Room</button>
            </div>
            
            {/* // roomlist */}
            {Object.keys(rooms).map((key)=> {
                return <div key={key}>
                    room ID : {key} | room Name : {rooms[key].name}
                    <button 
                    disabled={key == roomId}
                    title={`Join ${rooms[key].name} ID: ${key}`}
                    onClick={()=>handleJoinRoom(key)}
                    >
                       {rooms[key].name}

                    </button>
                    </div>
            })}
        </nav>
        
    ) 
    
}

export default RoomsContainer
