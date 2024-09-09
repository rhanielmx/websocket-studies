import type { FastifyInstance } from "fastify"
import { randomInt } from "node:crypto"

export async function websocketRoutes(app: FastifyInstance) {
  app.get('/subscribe', { websocket: true }, async (connection) => {
    console.log('WebSocket client connected')

    connection.on('message', async (message: string) => {
      console.log('Message Received: ', JSON.parse(message))
      const { kind, content } = JSON.parse(message)
      const messageId =  randomInt(1000)

      if(kind === 'NEW_MESSAGE') {
        connection.send(JSON.stringify({
          id: messageId,
          content: `Message ${messageId} - Recebida em: ${content}`
        }))
      }
      
    })

    connection.on('close', () => {
      console.log('WebSocket client disconnected')
    })
  })
}