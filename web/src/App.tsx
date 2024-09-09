import { useState } from 'react'
import './App.css'
import { useMessageWebsocket } from './hooks/use-message-websocket'
import { Buffer } from 'buffer'

export interface Receipt {
  id: string
  message: string
}

function App() {
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const ws = useMessageWebsocket({
    handleChange: setReceipts
  })
  const message = JSON.stringify({kind: 'NEW_MESSAGE', content: new Date().toISOString()})
  
  return (
    <div>
      <button onClick={()=>{ws.send(message)}}>Nova Mensagem</button>
      <ul>
        {
          receipts.map((receipt) => <li key={receipt.id}>{receipt.message}</li>)
        }
      </ul>
    </div>
  )
}

export default App
