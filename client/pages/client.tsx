import { useEffect, useRef, useState } from "react"
import EVENTS from "../config/events"
import { colour2 } from "../config/default"
import { useSockets } from "../context/socket.context"

export default function client(){
    const date = new Date()
    const {socket} = useSockets()
  
    const minusCount = useRef(0)
    const plusCount = useRef(0)
    const [dataList, setDataList] = useState([])

    const endGame = () => {
        console.log('End Game!!')
        socket.emit(EVENTS.CLIENT.END_GAME)
    }

    const handleMinusClick = () => {
            minusCount.current++;
            setDataList([ ...dataList ,
            {
                operation: '-',
                time: date
                //time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`
            }])    

        }   
       
    const handlePlusClick = () =>{
            plusCount.current++;
            setDataList([...dataList,
            {
                operation: '+',
                time: date
            }])
        }

 
    
    useEffect(()=>{
        if(dataList.length > 0){
            socket.emit(EVENTS.CLIENT.SEND_CLIENT_RESULT, {dataList})
            setTimeout(()=>{
                endGame()
            }, 5000)
        }
    }, [dataList])

   

    return <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',margin: '0'}}>
        <button style={{borderRadius:'100%', width:100, height:100, border: 'none', background: colour2.orange}} onClick={()=>handleMinusClick()}>{minusCount.current}: -</button> <br/>
        <button style={{borderRadius:'100%', width:100, height:100, border: 'none', background: colour2.originalBlue}} onClick={()=>handlePlusClick()}>{plusCount.current}: +</button> 

         
    </div>
}