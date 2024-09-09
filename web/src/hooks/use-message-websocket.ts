import { useEffect, useState } from "react"
import type { Receipt } from "../App"

interface UseMessageWebsocketParams {
  handleChange: React.Dispatch<React.SetStateAction<Receipt[]>>
}

export function useMessageWebsocket({
  handleChange
}: UseMessageWebsocketParams ){
  const [websocket, setWebsocket] = useState<WebSocket>(null as unknown as WebSocket)

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:3333/subscribe')
    setWebsocket(ws)
    ws.onopen = () => {
      console.log('Websocket connected!')
    }

    ws.onclose = () => {
      console.log('Websocket connection closed!')
    }

    ws.onmessage = (event) => {
      const { id, content } = JSON.parse(event.data)
      handleChange((state) => [...state, {id, message:content}])
    }

    // return () => {
    //   ws.close()
    // }
  }, [handleChange])

  return websocket
}