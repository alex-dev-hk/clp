import { useEffect, useRef } from "react"
import EVENTS from "../config/events";
import { useSockets } from "../context/socket.context"


function MessageContainer(){
    const {socket, messages, roomId, username, setMessages} = useSockets()
    const newMessageRef = useRef(null);
    const messageEndRef = useRef(null);

    function handleSendMessage(){
        const message = newMessageRef.current.value 
        // check is message undefine
        if(!String(message).trim()){return;}

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, message, username});

        const date = new Date()
            setMessages([
                ...messages, 
                {
                    username: 'You', 
                    message, 
                    time: `${date.getHours()}:${date.getMinutes()}`
                }
            ])
        newMessageRef.current.value = "";
    }

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth"});
    }, [messages])



    // User has no RoomId
    if(!roomId){
        return <div/>
    }

    return(
        <div>
            {messages.map(({message, username, time}, index) => {    
                return (
                        <div key={index}>
                            <p key={index}> 
                            username: {username} - {time} <br/>
                            message: {message}
                            </p>
                        </div>
                    )
            })}

            <div ref={messageEndRef} />
            {/* message box */}
            <div>
                <textarea
                    rows={1}
                    placeholder="Tell us what you are thinking"
                    ref={newMessageRef}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            
        </div>

    )
}

export default MessageContainer